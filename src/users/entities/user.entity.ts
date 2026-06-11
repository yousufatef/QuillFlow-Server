import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { CURRENT_TIMESTAMP } from "../../utils/constants";
import { Blog } from "../../blogs/entities/blog.entity";
import { Comment } from "../../comments/entities/comment.entity";
import { UserType } from "../../utils/enums";
import { Exclude } from "class-transformer";
import { Role } from "../../roles/entities/role.entity";

@Entity({ name: 'users' })
@Unique(['email', 'userType'])
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 250 })
    email!: string;

    @Column({ type: 'varchar', length: 150, nullable: true })
    username!: string;

    @Column()
    @Exclude()
    password!: string;

    @Column({ type: "enum", enum: UserType, default: UserType.NORMAL_USER })
    userType!: UserType;

    @Column({ default: false })
    isAccountVerified!: boolean;

    @Column({ default: null, nullable: true })
    profileImage!: string;

    // --- Role ---
    @Column({ nullable: true })
    roleId!: number | null;

    @ManyToOne(() => Role, { nullable: true, eager: false, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'roleId' })
    role!: Role | null;

    @CreateDateColumn({ type: 'timestamp', default: () => CURRENT_TIMESTAMP })
    created_at!: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => CURRENT_TIMESTAMP, onUpdate: CURRENT_TIMESTAMP })
    updated_at!: Date;

    // --- Relations ---
    @OneToMany(() => Blog, (blog) => blog.user)
    blogs!: Blog[];

    @OneToMany(() => Comment, (comment) => comment.user)
    comments!: Comment[];
}