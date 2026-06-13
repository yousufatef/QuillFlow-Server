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
    const { name, permissions } = createRoleDto;

    const existingRole = await this.roleRepository.findOne({ where: { name } });
    if (existingRole) {
      throw new ConflictException('This role already exists');
    }

    const role = this.roleRepository.create({ name });
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
    const { name, permissions } = updateRoleDto;

    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException('Role not found');
    }

    if (name && name !== role.name) {
      const existingRole = await this.roleRepository.findOne({ where: { name } });
      if (existingRole) {
        throw new ConflictException('This role already exists');
      }
      role.name = name;
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
      filters.name = ILike(`%${name}%`);
    }

    if (roleId) {
      filters.role = { id: roleId };
    }

    return this.roleRepository.find({ where: filters });
  }

  async findOne(id: number) {
    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role) {
      throw new Error(`Role with ID ${id} not found`);
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
      throw new NotFoundException('Role not found');
    }

    await this.roleRepository.remove(role);

    return { message: 'Role deleted successfully' };
  }

}