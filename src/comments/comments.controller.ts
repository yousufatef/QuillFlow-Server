import { UsersService } from '../users/users.service';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, Put, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateReviewDto } from './dto/create-comment.dto';
import { UpdateReviewDto } from './dto/update-comment.dto';
import { Roles } from '../users/decorators/user-role.decorator';
import { AuthRoleGuard } from '../users/guards/auth-role.guard';
import { UserType } from '../utils/enums';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import type { JwtPayloadType } from '../utils/types';

@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
  ) { }

  @Post(':productId')
  @UseGuards(AuthRoleGuard)
  @Roles(UserType.ADMIN, UserType.NORMAL_USER)
  createNewReview(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() createReviewDto: CreateReviewDto,
    @CurrentUser() payload: JwtPayloadType
  ) {
    return this.commentsService.createReview(createReviewDto, productId, payload.id);
  }

  // @Get()
  // @UseGuards(AuthRoleGuard)
  // @Roles(UserType.ADMIN)
  // GetAllReviews(
  //   @Query("pageNumber", ParseIntPipe) pageNumber: number,
  //   @Query("pageSize", ParseIntPipe) pageSize: number
  // ) {
  //   return this.commentsService.GetAllReviews(pageNumber, pageSize);
  // }

  @Get(':id')
  @UseGuards(AuthRoleGuard)
  @Roles(UserType.ADMIN)
  getReviewById(@Param('id') id: number) {
    return this.commentsService.getReviewById(id);
  }

  @Put(':id')
  @UseGuards(AuthRoleGuard)
  @Roles(UserType.ADMIN)
  update(@Param('id') id: number, @Body() updateReviewDto: UpdateReviewDto, @CurrentUser() payload: JwtPayloadType) {
    return this.commentsService.update(id, updateReviewDto, payload.id);
  }

  // @Delete(':id')
  // @UseGuards(AuthRoleGuard)
  // @Roles(UserType.ADMIN)
  // remove(@Param('id') id: number, @CurrentUser() payload: JwtPayloadType) {
  //   return this.commentsService.remove(id, payload);
  // }
}
