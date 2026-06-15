import { ClassSerializerInterceptor, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UploadsModule } from './uploads/uploads.module';
import { LoggerMiddleware } from './utils/middlewares/logger.middleware';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AcceptLanguageResolver, HeaderResolver, I18nJsonLoader, I18nModule, QueryResolver } from 'nestjs-i18n';
import * as path from 'path';
import { CommentsModule } from './comments/comments.module';
import { BlogsModule } from './blogs/blogs.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RolePermission } from './roles/entities/role-permission.entity';
import { AdminsModule } from './admins/admins.module';
import { ApiResponseInterceptor } from './utils/interceptors/api-response.interceptor';
import { ApiExceptionFilter } from './utils/filters/api-exception.filter';
import { dataSourceOptions } from '../db/data-source';

@Module({
  imports: [UsersModule, AdminsModule, AuthModule, BlogsModule,
    CommentsModule, RolesModule, PermissionsModule, RolePermission,
    CategoriesModule, UploadsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV !== "production" ? `.env.${process.env.NODE_ENV || 'development'}` : `.env`,
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: configService.get('FALLBACK_LANGUAGE', 'en'),

        loader: I18nJsonLoader,

        loaderOptions: {
          path: path.join(process.cwd(), 'src/i18n'),
        },
      }),
      inject: [ConfigService],
      resolvers: [
        new QueryResolver(['lang']),
        new HeaderResolver(['x-lang']),
        AcceptLanguageResolver,
      ],
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    // Remote DB 
    TypeOrmModule.forRoot(dataSourceOptions),
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: async (config: ConfigService) => {
    //     return {
    //       type: 'postgres',
    //       host: "localhost",
    //       port: config.get<number>('DB_PORT'),
    //       username: config.get<string>('DB_USERNAME'),
    //       password: config.get<string>('DB_PASSWORD'),
    //       database: config.get<string>('DB_DATABASE'),
    //       entities: [Blog, User, Comment, Category, Role, Permission, RolePermission],
    //       synchronize: false,
    //     }
    //   }
    // }),
    CategoriesModule,
    RolesModule,
    PermissionsModule,
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_INTERCEPTOR,
    useClass: ClassSerializerInterceptor,
  },
    {
      provide: APP_INTERCEPTOR,
      useClass: ApiResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ApiExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }

  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({
        path: "products",
        method: RequestMethod.GET,
      });
  }

}



//Locale DB
// TypeOrmModule.forRootAsync({
//   inject: [ConfigService],
//   useFactory: async (config: ConfigService) => {
//     return {
//       type: 'postgres',
//       host: "localhost",
//       port: config.get<number>('DB_PORT'),
//       username: config.get<string>('DB_USERNAME'),
//       password: config.get<string>('DB_PASSWORD'),
//       database: config.get<string>('DB_DATABASE'),
//       entities: [Blog, User, Comment, Category, Role, Permission, RolePermission],
//       synchronize: false,
//     }
//   }
// }),
