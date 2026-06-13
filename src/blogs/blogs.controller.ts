import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, Put, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { AuthRoleGuard } from '../users/guards/auth-role.guard';
import { Roles } from '../users/decorators/user-role.decorator';
import { UserType } from '../utils/enums';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import type { JwtPayloadType } from '../utils/types';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateCategoryDto } from '../categories/dto/update-category.dto';
import { plainToInstance } from 'class-transformer';
import { BlogResponseDto } from './dto/blog-response.dto';
import { RequirePermissions } from '../users/decorators/permissions.decorator';
import { PermissionGuard } from '../users/guards/permission.guard';

@Controller('blogs')
export class ProductsController {
  constructor(private readonly blogsService: BlogsService) { }

  @Post("create-blog")
  @UseGuards(AuthRoleGuard, PermissionGuard)
  @Roles(UserType.ADMIN, UserType.SUPER_ADMIN)
  @RequirePermissions({ resource: 'Blogs', action: 'create' })
  @UseInterceptors(FileInterceptor('coverImage'))
  create(
    @Body() createBlogDto: CreateBlogDto,
    @CurrentUser() payload: JwtPayloadType,
    @UploadedFile() coverImage?: Express.Multer.File,
  ) {
    return this.blogsService.createBlog(createBlogDto, payload.id, coverImage?.filename);
  }


  @Get()
  @UseGuards(AuthRoleGuard, PermissionGuard)
  @Roles(UserType.SUPER_ADMIN, UserType.ADMIN)
  @RequirePermissions({ resource: 'Blogs', action: 'read' })
  async getAllBlogs(
    @Query("title") title: string,
    @Query("categoryId", new ParseIntPipe({ optional: true })) categoryId?: number,
  ) {
    const blogs = await this.blogsService.getAllBlogs(title, categoryId);
    return plainToInstance(BlogResponseDto, blogs, { excludeExtraneousValues: true });
  }


  @Get(':id')
  @UseGuards(AuthRoleGuard, PermissionGuard)
  @Roles(UserType.SUPER_ADMIN, UserType.ADMIN)
  @RequirePermissions({ resource: 'Blogs', action: 'read' })
  getProductById(@Param('id', ParseIntPipe) id: number) {
    return this.blogsService.getBlogById(id);
  }

  @Put(':id')
  @UseGuards(AuthRoleGuard, PermissionGuard)
  @Roles(UserType.SUPER_ADMIN, UserType.ADMIN)
  @RequirePermissions({ resource: 'Blogs', action: 'update' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.update(id, updateBlogDto);
  }

  @Delete(':id')
  @UseGuards(AuthRoleGuard, PermissionGuard)
  @Roles(UserType.SUPER_ADMIN, UserType.ADMIN)
  @RequirePermissions({ resource: 'Blogs', action: 'delete' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.blogsService.remove(id);
  }
}
