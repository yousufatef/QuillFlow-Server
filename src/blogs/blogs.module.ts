import { Module } from '@nestjs/common';
import { ProductsController } from './blogs.controller';
import { Blog } from './entities/blog.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { BlogsService } from './blogs.service';

@Module({
  imports: [TypeOrmModule.forFeature([Blog]), UsersModule, JwtModule],
  controllers: [ProductsController],
  providers: [BlogsService],
  exports: [BlogsService],
})
export class BlogsModule { }
