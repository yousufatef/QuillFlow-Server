import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { BlogsModule } from '../blogs/blogs.module';
import { Comment } from './entities/comment.entity';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), BlogsModule, UsersModule, JwtModule],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule { }
