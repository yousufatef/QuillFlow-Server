import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) { }

  async create(createPermissionDto: CreatePermissionDto) {
    const { nameEn, nameAr, module } = createPermissionDto;
    const permission = await this.permissionRepository.findOne({
      where: [{ nameEn, module }, { nameAr, module }],
    });

    if (permission) {
      throw new ConflictException('common.permissions.alreadyExists');
    }

    return this.permissionRepository.save(createPermissionDto);
  }

  findAll(name?: string, module?: string) {
    if (name) {
      return this.permissionRepository.find({
        where: [
          { nameEn: ILike(`%${name}%`), ...(module ? { module } : {}) },
          { nameAr: ILike(`%${name}%`), ...(module ? { module } : {}) },
        ],
      });
    }

    return this.permissionRepository.find({
      where: module ? { module } : {},
    });
  }

  async findOne(id: number) {
    const permission = await this.permissionRepository.findOne({ where: { id } });
    if (!permission) {
      throw new NotFoundException('common.permissions.notFound');
    }

    return permission;
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    const permission = await this.findOne(id);
    const { nameEn, nameAr, module } = updatePermissionDto;

    if (nameEn || nameAr || module) {
      const nextModule = module ?? permission.module;
      const existingPermission = await this.permissionRepository.findOne({
        where: [
          ...(nameEn ? [{ nameEn, module: nextModule }] : []),
          ...(nameAr ? [{ nameAr, module: nextModule }] : []),
        ],
      });

      if (existingPermission && existingPermission.id !== id) {
        throw new ConflictException('common.permissions.alreadyExists');
      }
    }

    Object.assign(permission, updatePermissionDto);
    return this.permissionRepository.save(permission);
  }

  async remove(id: number) {
    const permission = await this.findOne(id);
    await this.permissionRepository.remove(permission);
    return null;
  }
}
