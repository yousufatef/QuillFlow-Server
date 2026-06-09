import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RolePermission } from "./role-permission.entity";

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    name!: string;

    @Column({ default: true })
    isActive!: boolean;

    @OneToMany(() => RolePermission, (rp) => rp.role, { cascade: true })
    rolePermissions!: RolePermission[];
}