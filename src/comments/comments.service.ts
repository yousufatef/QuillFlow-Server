import { UsersService } from '../users/users.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-comment.dto';
import { UpdateReviewDto } from './dto/update-comment.dto';
import { BlogsService } from '../blogs/blogs.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { JwtPayloadType } from '../utils/types';
import { UserType } from '../utils/enums';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {

  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly UsersService: UsersService,
    private readonly ProductsService: BlogsService,
  ) { }

  async createReview(dto: CreateReviewDto, productId: number, userId: number) {
    // const user = await this.UsersService.getCurrentUser(userId);
    // const product = await this.ProductsService.getProductById(productId);

    // if (!user) {
    //   throw new Error('User not found');
    // }
    // if (!product) {
    //   throw new Error('Product not found');
    // }

    // const comment = this.commentRepository.create({
    //   ...dto,
    //   user,
    //   blog,
    // });
    // await this.commentRepository.save(comment);
    // return {
    //   id: comment.id,
    //   rating: comment.rating,
    //   comment: comment.comment,
    //   created_at: comment.created_at,
    //   userId
    // }
  }

  async GetAllComments(pageNumber: number, pageSize: number) {
    return await this.commentRepository.find({
      order: { created_at: 'DESC' },
      skip: (pageNumber - 1) * pageSize,
      take: pageSize
    });
  }

  async getReviewById(id: number) {
    const review = await this.commentRepository.findOne({ where: { id } });
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    return review;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto, userId: number) {
    //   const review = await this.commentRepository.findOne({ where: { id } });
    //   if (!review) {
    //     throw new NotFoundException(`Review with ID ${id} not found`);
    //   }
    //   review.rating = updateReviewDto.rating ?? review.rating;
    //   review.comment = updateReviewDto.comment ?? review.comment;
    //   await this.commentRepository.save(review);
    //   return review;
    // }

    // async remove(id: number, payload: JwtPayloadType) {
    //   const review = await this.commentRepository.findOne({ where: { id } });
    //   if (!review) {
    //     throw new NotFoundException(`Review with ID ${id} not found`);
    //   }
    //   if (comment.user.id === payload.id || payload.userType === UserType.ADMIN) {
    //     await this.commentRepository.remove(review);
    //   }
    //   return { message: `Review with ID ${id} removed` };
    // }
  }
}
