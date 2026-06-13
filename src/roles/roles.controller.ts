import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AuthRoleGuard } from '../users/guards/auth-role.guard';
import { Roles } from '../users/decorators/user-role.decorator';
import { UserType } from '../utils/enums';
import { PermissionGuard } from '../users/guards/permission.guard';
import { RequirePermissions } from '../users/decorators/permissions.decorator';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @Post('create')
  @UseGuards(AuthRoleGuard, PermissionGuard)
  @Roles(UserType.SUPER_ADMIN, UserType.ADMIN)
  @RequirePermissions({ resource: 'Roles', action: 'create' })
  create(@Body() dto: CreateRoleDto) {
    return this.rolesService.create(dto);
  }

  @Put(':id')
  @UseGuards(AuthRoleGuard, PermissionGuard)
  @Roles(UserType.SUPER_ADMIN, UserType.ADMIN)
  @RequirePermissions({ resource: 'Roles', action: 'update' })
  update(@Param('id') id: string, @Body() dto: UpdateRoleDto) {
    return this.rolesService.update(+id, dto);
  }

  @Get()
  @UseGuards(AuthRoleGuard, PermissionGuard)
  @Roles(UserType.SUPER_ADMIN, UserType.ADMIN)
  @RequirePermissions({ resource: 'Roles', action: 'read' })
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthRoleGuard, PermissionGuard)
  @Roles(UserType.SUPER_ADMIN, UserType.ADMIN)
  @RequirePermissions({ resource: 'Roles', action: 'read' })
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Get('with-permissions/:id')
  @UseGuards(AuthRoleGuard, PermissionGuard)
  @Roles(UserType.SUPER_ADMIN, UserType.ADMIN)
  @RequirePermissions({ resource: 'Roles', action: 'read' })
  findOneWithPermissions(@Param('id') id: string) {
    return this.rolesService.findOneWithPermissions(+id);
  }

  @Delete('delete/:id')
  @UseGuards(AuthRoleGuard, PermissionGuard)
  @Roles(UserType.SUPER_ADMIN, UserType.ADMIN)
  @RequirePermissions({ resource: 'Roles', action: 'delete' })
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
