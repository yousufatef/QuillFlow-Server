// comments.service.ts
import { UsersService } from '../users/users.service';
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { BlogsService } from '../blogs/blogs.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly usersService: UsersService,
    private readonly blogsService: BlogsService,
  ) { }

  async createComment(dto: CreateCommentDto, blogId: number, userId: number) {
    await this.blogsService.getBlogById(blogId);

    const user = await this.usersService.getCurrentUser(userId);

    const comment = this.commentRepository.create({
      content: dto.content,
      blog: { id: blogId } as any,
      user,
      parent_comment_id: dto.parent_comment_id,
    });

    return await this.commentRepository.save(comment);
  }

  async getCommentById(id: number, userId: number) {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: { user: true, blog: true },
    });

    if (!comment) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }

    if (comment.user.id !== userId) {
      throw new ForbiddenException('You are not allowed to view this comment');
    }

    return comment;
  }

  async update(id: number, dto: UpdateCommentDto, userId: number) {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: { user: true },
    });

    if (!comment) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }

    if (comment.user.id !== userId) {
      throw new ForbiddenException('You are not allowed to update this comment');
    }

    comment.content = dto.content;
    comment.is_edited = true;

    return await this.commentRepository.save(comment);
  }

  async remove(id: number, userId: number) {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: { user: true },
    });

    if (!comment) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }

    if (comment.user.id !== userId) {
      throw new ForbiddenException('You are not allowed to delete this comment');
    }

    await this.commentRepository.remove(comment);
    return { message: 'Comment deleted successfully' };
  }
}