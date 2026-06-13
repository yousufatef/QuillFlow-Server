import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "./entities/role.entity";
import { RolePermission } from "./entities/role-permission.entity";
import { ILike, Repository } from "typeorm";
import { CreateRoleDto } from "./dto/create-role.dto";
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { UpdateRoleDto } from "./dto/update-role.dto";

@Injectable()
export class RolesService {

  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,

    @InjectRepository(RolePermission)
    private readonly rolePermissionRepository: Repository<RolePermission>,
  ) { }

  async create(createRoleDto: CreateRoleDto) {
    const { nameEn, nameAr, permissions } = createRoleDto;

    const existingRole = await this.roleRepository.findOne({
      where: [{ nameEn }, { nameAr }],
    });
    if (existingRole) {
      throw new ConflictException('common.roles.alreadyExists');
    }

    const role = this.roleRepository.create({ nameEn, nameAr });
    await this.roleRepository.save(role);

    const rolePermissions = permissions.map(p =>
      this.rolePermissionRepository.create({
        roleId: role.id,
        permissionId: p.permissionId,
        canCreate: p.canCreate ?? false,
        canRead: p.canRead ?? false,
        canUpdate: p.canUpdate ?? false,
        canDelete: p.canDelete ?? false,
      })
    );

    await this.rolePermissionRepository.save(rolePermissions);

    return this.roleRepository.findOne({
      where: { id: role.id },
      relations: {
        rolePermissions: {
          permission: true,
        },
      },
    });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const { nameEn, nameAr, permissions } = updateRoleDto;

    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException('common.roles.notFound');
    }

    if (nameEn || nameAr) {
      const existingRole = await this.roleRepository.findOne({
        where: [
          ...(nameEn ? [{ nameEn }] : []),
          ...(nameAr ? [{ nameAr }] : []),
        ],
      });
      if (existingRole && existingRole.id !== id) {
        throw new ConflictException('common.roles.alreadyExists');
      }
      role.nameEn = nameEn ?? role.nameEn;
      role.nameAr = nameAr ?? role.nameAr;
      await this.roleRepository.save(role);
    }

    await this.rolePermissionRepository.delete({ roleId: id });

    if (permissions && permissions.length > 0) {
      const rolePermissions = permissions.map(p =>
        this.rolePermissionRepository.create({
          roleId: id,
          permissionId: p.permissionId,
          canCreate: p.canCreate ?? false,
          canRead: p.canRead ?? false,
          canUpdate: p.canUpdate ?? false,
          canDelete: p.canDelete ?? false,
        })
      );

      await this.rolePermissionRepository.save(rolePermissions);
    }

    return this.roleRepository.findOne({
      where: { id },
      relations: {
        rolePermissions: {
          permission: true,
        },
      },
    });
  }

  async findAll(name?: string, roleId?: number) {
    const filters: any = {};

    if (name) {
      return this.roleRepository.find({
        where: [
          { nameEn: ILike(`%${name}%`) },
          { nameAr: ILike(`%${name}%`) },
        ],
      });
    }

    if (roleId) {
      filters.role = { id: roleId };
    }

    return this.roleRepository.find({ where: filters });
  }

  async findOne(id: number) {
    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException('common.roles.notFound');
    }
    return role;
  }

  async findOneWithPermissions(roleId: number) {
    return this.roleRepository.findOne({
      where: { id: roleId },
      relations: {
        rolePermissions: {
          permission: true,
        },
      },
    });
  }

  async remove(id: number) {
    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException('common.roles.notFound');
    }

    await this.roleRepository.remove(role);

    return null;
  }

}
