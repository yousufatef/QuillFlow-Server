import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CURRENT_TIMESTAMP } from "../../utils/constants";
import { Blog } from "../../blogs/entities/blog.entity";

@Entity({ name: 'categories' })
export class Category {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 100, unique: true })
    name!: string;

    @Column({ type: 'text', nullable: true })
    description!: string;

    @Column({ type: 'boolean', default: true })
    is_active!: boolean;

    @CreateDateColumn({ type: 'timestamp', default: () => CURRENT_TIMESTAMP })
    created_at!: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => CURRENT_TIMESTAMP, onUpdate: CURRENT_TIMESTAMP })
    updated_at!: Date;

    // --- Relations ---
    @OneToMany(() => Blog, (blog) => blog.category)
    blogs!: Blog[];
}