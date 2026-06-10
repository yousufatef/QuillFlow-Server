import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { Between, ILike, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { Blog } from './entities/blog.entity';
import { Category } from '../categories/entities/category.entity';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
    private readonly usersService: UsersService,
  ) { }

  async createBlog(createBlogDto: CreateBlogDto, userId: number, coverImage?: string) {
    const user = await this.usersService.getCurrentUser(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const blog = this.blogRepository.create({
      ...createBlogDto,
      title: createBlogDto.title?.toLowerCase(),
      coverImage: coverImage ?? null,
      user,
      category: { id: createBlogDto.categoryId } as Category
    });

    await this.blogRepository.save(blog);
    return blog;
  }
  async getAllBlogs(title?: string, categoryId?: number) {
    const filters: any = {};

    if (title) {
      filters.title = ILike(`%${title}%`);
    }

    if (categoryId) {
      filters.category = { id: categoryId };
    }

    return this.blogRepository.find({ where: filters });
  }

  async getBlogById(id: number) {
    const product = await this.blogRepository.findOne({ where: { id } });
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    const product = await this.blogRepository.findOne({ where: { id } });
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    product.title = updateBlogDto.title ?? product.title;
    product.description = updateBlogDto.description ?? product.description;

    return await this.blogRepository.save(product);
  }

  async remove(id: number) {
    const blog = await this.blogRepository.findOne({ where: { id } });
    if (!blog) {
      throw new Error(`blog with ID ${id} not found`);
    }
    await this.blogRepository.remove(blog);
    return `Blog with ID ${id} has been deleted`;
  }


}
