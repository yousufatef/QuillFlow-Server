import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RolePermission } from "../../roles/entities/role-permission.entity";

@Entity('permissions')
export class Permission {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nameEn!: string; // e.g. "Blogs"

    @Column()
    nameAr!: string; // e.g. "المقالات"

    @Column()
    module!: string; // e.g. "CMS"

    @OneToMany(() => RolePermission, (rp) => rp.permission)
    rolePermissions!: RolePermission[];
}
