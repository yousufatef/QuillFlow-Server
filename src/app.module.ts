import { ClassSerializerInterceptor, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { ReviewsModule } from './reviews/reviews.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/entities/product.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Review } from './reviews/entities/review.entity';
import { User } from './users/entities/user.entity';
import { UploadsModule } from './uploads/uploads.module';
import { LoggerMiddleware } from './utils/middlewares/logger.middleware';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { dataSourceOptions } from '../db/data-source';

@Module({
  imports: [UsersModule, ProductsModule, ReviewsModule, UploadsModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV !== "production" ? `.env.${process.env.NODE_ENV || 'development'}` : `.env`,
    }),
    TypeOrmModule.forRoot(dataSourceOptions)
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: 'APP_INTERCEPTOR',
    useClass: ClassSerializerInterceptor,
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
// {
//   inject: [ConfigService],
//     useFactory: async (config: ConfigService) => {
//       return {
//         type: 'postgres',
//         host: "localhost",
//         port: config.get<number>('DB_PORT'),
//         username: config.get<string>('DB_USERNAME'),
//         password: config.get<string>('DB_PASSWORD'),
//         database: config.get<string>('DB_DATABASE'),
//         entities: [Product, User, Review],
//         synchronize: process.env.NODE_ENV !== 'production',
//       }
//     }
// }