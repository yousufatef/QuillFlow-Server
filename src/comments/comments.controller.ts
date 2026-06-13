import { Controller, Get, Post, Body, Param, Delete, UseGuards, ParseIntPipe, Put } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import type { JwtPayloadType } from '../utils/types';
import { AuthGuard } from '../users/guards/auth.guard';
import { ResponseMessage } from '../utils/decorators/response-message.decorator';

@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
  ) { }

  @Post(':blogId')
  @UseGuards(AuthGuard)
  @ResponseMessage('comments.created')
  createNewComment(
    @Param('blogId', ParseIntPipe) blogId: number,
    @Body() createCommentDto: CreateCommentDto,
    @CurrentUser() payload: JwtPayloadType,
  ) {
    return this.commentsService.createComment(createCommentDto, blogId, payload.id);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ResponseMessage('comments.retrieved')
  getCommentById(@Param('id', ParseIntPipe) id: number, @CurrentUser() payload: JwtPayloadType) {
    return this.commentsService.getCommentById(id, payload.id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ResponseMessage('comments.updated')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto,
    @CurrentUser() payload: JwtPayloadType,
  ) {
    return this.commentsService.update(id, updateCommentDto, payload.id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ResponseMessage('comments.deleted')
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() payload: JwtPayloadType) {
    return this.commentsService.remove(id, payload.id);
  }
}
