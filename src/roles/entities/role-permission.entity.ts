import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";
import { Permission } from "../../permissions/entities/permission.entity";

@Entity('role_permissions')
export class RolePermission {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Role, (role) => role.rolePermissions, { onDelete: 'CASCADE' })
    role!: Role;

    @Column()
    roleId!: number;

    @ManyToOne(() => Permission, (p) => p.rolePermissions)
    permission!: Permission;

    @Column()
    permissionId!: number;

    @Column({ default: false }) canCreate!: boolean;
    @Column({ default: false }) canRead!: boolean;
    @Column({ default: false }) canUpdate!: boolean;
    @Column({ default: false }) canDelete!: boolean;
}