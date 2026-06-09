import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RolePermission } from "../../roles/entities/role-permission.entity";

@Entity('permissions')
export class Permission {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string; // e.g. "Blogs"

    @Column()
    module!: string; // e.g. "CMS"

    @OneToMany(() => RolePermission, (rp) => rp.permission)
    rolePermissions!: RolePermission[];
}