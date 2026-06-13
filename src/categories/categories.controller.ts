import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Roles } from '../users/decorators/user-role.decorator';
import { UserType } from '../utils/enums';
import { AuthRoleGuard } from '../users/guards/auth-role.guard';
import { PermissionGuard } from '../users/guards/permission.guard';
import { RequirePermissions } from '../users/decorators/permissions.decorator';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post()
  @UseGuards(AuthRoleGuard, PermissionGuard)
  @Roles(UserType.SUPER_ADMIN, UserType.ADMIN)
  @RequirePermissions({ resource: 'Categories', action: 'create' })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @UseGuards(AuthRoleGuard, PermissionGuard)
  @Roles(UserType.SUPER_ADMIN, UserType.ADMIN)
  @RequirePermissions({ resource: 'Categories', action: 'read' })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthRoleGuard, PermissionGuard)
  @Roles(UserType.SUPER_ADMIN, UserType.ADMIN)
  @RequirePermissions({ resource: 'Categories', action: 'read' })
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(AuthRoleGuard, PermissionGuard)
  @Roles(UserType.SUPER_ADMIN, UserType.ADMIN)
  @RequirePermissions({ resource: 'Categories', action: 'update' })
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @UseGuards(AuthRoleGuard, PermissionGuard)
  @Roles(UserType.SUPER_ADMIN, UserType.ADMIN)
  @RequirePermissions({ resource: 'Categories', action: 'delete' })
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
