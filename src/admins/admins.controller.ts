import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put, BadRequestException, UploadedFile, UseInterceptors, Res } from '@nestjs/common';

;
import { UserType } from '../utils/enums';
import { FileInterceptor } from '@nestjs/platform-express';
import type { JwtPayloadType } from '../utils/types';
import type { Response } from 'express';
import { AdminsService } from './admins.service';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { Roles } from '../users/decorators/user-role.decorator';
import { AuthRoleGuard } from '../users/guards/auth-role.guard';
import { AuthGuard } from '../users/guards/auth.guard';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PermissionGuard } from '../users/guards/permission.guard';
import { RequirePermissions } from '../users/decorators/permissions.decorator';
import { ResponseMessage } from '../utils/decorators/response-message.decorator';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) { }

  @Post()
  @UseGuards(AuthRoleGuard, PermissionGuard)
  @Roles(UserType.SUPER_ADMIN, UserType.ADMIN)
  @RequirePermissions({ resource: 'Admins', action: 'create' })
  @ResponseMessage('common.admins.created')
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  @Put(':id')
  @UseGuards(AuthRoleGuard, PermissionGuard)
  @Roles(UserType.SUPER_ADMIN, UserType.ADMIN)
  @RequirePermissions({ resource: 'Admins', action: 'update' })
  @ResponseMessage('common.admins.updated')
  update(
    @CurrentUser() payload: JwtPayloadType,
    @Param('id') id: string,
    @Body() body: UpdateAdminDto,
  ) {
    return this.adminsService.update(+id, body);
  }

  @Delete(':id')
  @UseGuards(AuthRoleGuard, PermissionGuard)
  @Roles(UserType.SUPER_ADMIN, UserType.ADMIN)
  @RequirePermissions({ resource: 'Admins', action: 'delete' })
  @ResponseMessage('common.admins.deleted')
  remove(
    @Param('id') id: number,
    @CurrentUser() payload: JwtPayloadType
  ) {
    return this.adminsService.remove(id);
  }

  @Post('upload-profile-image')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('user-image'))
  @ResponseMessage('common.users.profileImageUploaded')
  uploadProfileImage(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() payload: JwtPayloadType,
  ) {
    if (!file) throw new BadRequestException('common.uploads.fileRequired');
    return this.adminsService.uploadProfileImage(file.filename, payload.id);
  }

  @Delete('images/remove-profile-image')
  @UseGuards(AuthGuard)
  @ResponseMessage('common.users.profileImageRemoved')
  removeProfileImage(@CurrentUser() payload: JwtPayloadType) {
    return this.adminsService.removeProfileImage(payload.id);
  }

  @Get('images/:image')
  @UseGuards(AuthGuard)
  getProfile(@Param('image') image: string, @Res() res: Response) {
    return res.sendFile(image, { root: './uploads/profile-images' });
  }

  @Get()
  @UseGuards(AuthRoleGuard, PermissionGuard)
  @Roles(UserType.SUPER_ADMIN, UserType.ADMIN)
  @RequirePermissions({ resource: 'Admins', action: 'read' })
  @ResponseMessage('common.admins.listRetrieved')
  getAllUsers() {
    return this.adminsService.getAllUsers();
  }

  @Get('current-user')
  @UseGuards(AuthGuard)
  @ResponseMessage('common.admins.retrieved')
  getCurrentUser(@CurrentUser() payload: JwtPayloadType) {
    return this.adminsService.getCurrentUser(payload.id);
  }

  @Get(":id")
  @UseGuards(AuthRoleGuard, PermissionGuard)
  @Roles(UserType.SUPER_ADMIN, UserType.ADMIN)
  @RequirePermissions({ resource: 'Admins', action: 'read' })
  @ResponseMessage('common.admins.retrieved')
  getUserById(@Param('id') id: string) {
    return this.adminsService.getUserById(+id);
  }
}
