import { Module } from '@nestjs/common';
import { ReviewsService } from './comments.service';
import { ReviewsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/comment.entity';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { BlogsModule } from '../blogs/blogs.module';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), BlogsModule, UsersModule, JwtModule],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class CommentsModule { }
