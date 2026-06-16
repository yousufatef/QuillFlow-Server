import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AuthRoleGuard } from '../users/guards/auth-role.guard';
import { Roles } from '../users/decorators/user-role.decorator';
import { UserType } from '../utils/enums';
import { PermissionGuard } from '../users/guards/permission.guard';
import { RequirePermissions } from '../users/decorators/permissions.decorator';
import { ResponseMessage } from '../utils/decorators/response-message.decorator';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @Post('create')
  @UseGuards(AuthRoleGuard, PermissionGuard)
  @Roles(UserType.SUPER_ADMIN, UserType.ADMIN)
  @RequirePermissions({ resource: 'Roles', action: 'create' })
  @ResponseMessage('common.roles.created')
  create(@Body() dto: CreateRoleDto) {
    return this.rolesService.create(dto);
  }

  @Put(':id')
  @UseGuards(AuthRoleGuard, PermissionGuard)
  @Roles(UserType.SUPER_ADMIN, UserType.ADMIN)
  @RequirePermissions({ resource: 'Roles', action: 'update' })
  @ResponseMessage('common.roles.updated')
  update(@Param('id') id: string, @Body() dto: UpdateRoleDto) {
    return this.rolesService.update(+id, dto);
  }

  @Get()
  @UseGuards(AuthRoleGuard, PermissionGuard)
  @Roles(UserType.SUPER_ADMIN, UserType.ADMIN)
  @RequirePermissions({ resource: 'Roles', action: 'read' })
  @ResponseMessage('common.roles.listRetrieved')
  findAll(@Query('name') name?: string) {
    return this.rolesService.findAll(name);
  }

  @Get('with-permissions/:id')
  @UseGuards(AuthRoleGuard, PermissionGuard)
  @Roles(UserType.SUPER_ADMIN, UserType.ADMIN)
  @RequirePermissions({ resource: 'Roles', action: 'read' })
  @ResponseMessage('common.roles.retrieved')
  findOneWithPermissions(@Param('id') id: string) {
    return this.rolesService.findOneWithPermissions(+id);
  }

  @Get(':id')
  @UseGuards(AuthRoleGuard, PermissionGuard)
  @Roles(UserType.SUPER_ADMIN, UserType.ADMIN)
  @RequirePermissions({ resource: 'Roles', action: 'read' })
  @ResponseMessage('common.roles.retrieved')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Delete('delete/:id')
  @UseGuards(AuthRoleGuard, PermissionGuard)
  @Roles(UserType.SUPER_ADMIN, UserType.ADMIN)
  @RequirePermissions({ resource: 'Roles', action: 'delete' })
  @ResponseMessage('common.roles.deleted')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
