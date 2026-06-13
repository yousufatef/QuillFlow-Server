import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { ILike, Repository } from 'typeorm';
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
      throw new NotFoundException('common.users.notFound');
    }

    const blog = this.blogRepository.create({
      ...createBlogDto,
      coverImage: coverImage ?? null,
      user,
      category: { id: createBlogDto.categoryId } as Category
    });

    await this.blogRepository.save(blog);
    return blog;
  }
  async getAllBlogs(name?: string, categoryId?: number) {
    const filters: any = {};

    if (name) {
      return this.blogRepository.find({
        where: [
          { nameEn: ILike(`%${name}%`), ...(categoryId ? { category: { id: categoryId } } : {}) },
          { nameAr: ILike(`%${name}%`), ...(categoryId ? { category: { id: categoryId } } : {}) },
        ],
      });
    }

    if (categoryId) {
      filters.category = { id: categoryId };
    }

    return this.blogRepository.find({ where: filters });
  }

  async getBlogById(id: number) {
    const blog = await this.blogRepository.findOne({ where: { id } });
    if (!blog) {
      throw new NotFoundException('common.blogs.notFound');
    }
    return blog;
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    const blog = await this.blogRepository.findOne({ where: { id } });
    if (!blog) {
      throw new NotFoundException('common.blogs.notFound');
    }
    blog.nameEn = updateBlogDto.nameEn ?? blog.nameEn;
    blog.nameAr = updateBlogDto.nameAr ?? blog.nameAr;
    blog.descriptionEn = updateBlogDto.descriptionEn ?? blog.descriptionEn;
    blog.descriptionAr = updateBlogDto.descriptionAr ?? blog.descriptionAr;
    blog.category = updateBlogDto.categoryId
      ? ({ id: updateBlogDto.categoryId } as Category)
      : blog.category;

    return await this.blogRepository.save(blog);
  }

  async remove(id: number) {
    const blog = await this.blogRepository.findOne({ where: { id } });
    if (!blog) {
      throw new NotFoundException('common.blogs.notFound');
    }
    await this.blogRepository.remove(blog);
    return null;
  }


}
