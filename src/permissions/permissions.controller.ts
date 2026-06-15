import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { ResponseMessage } from '../utils/decorators/response-message.decorator';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) { }

  @Post()
  @ResponseMessage('common.permissions.created')
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @Get()
  @ResponseMessage('common.permissions.listRetrieved')
  findAll(@Query('name') name?: string, @Query('module') module?: string) {
    return this.permissionsService.findAll(name, module);
  }

  @Get(':id')
  @ResponseMessage('common.permissions.retrieved')
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(+id);
  }

  @Patch(':id')
  @ResponseMessage('common.permissions.updated')
  update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionsService.update(+id, updatePermissionDto);
  }

  @Delete(':id')
  @ResponseMessage('common.permissions.deleted')
  remove(@Param('id') id: string) {
    return this.permissionsService.remove(+id);
  }
}
