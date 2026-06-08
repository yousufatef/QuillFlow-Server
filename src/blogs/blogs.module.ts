import { Module } from '@nestjs/common';
import { ProductsService } from './blogs.service';
import { ProductsController } from './blogs.controller';
import { Product } from './entities/blog.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), UsersModule, JwtModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class BlogsModule { }
