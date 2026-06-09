import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { CURRENT_TIMESTAMP } from "../../utils/constants";
import { User } from "../../users/entities/user.entity";
import { Comment } from "../../comments/entities/comment.entity";
import { IsNumber } from "class-validator";
import { Category } from "../../categories/entities/category.entity";

@Entity({ name: 'blogs' })
export class Blog {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    title!: string;

    @Column({ type: 'text' })
    description!: string;

    @Column({ default: null, nullable: true })
    coverImage!: string;

    @Column({ type: 'boolean', default: false })
    is_published!: boolean;

    @CreateDateColumn({ type: 'timestamp', default: () => CURRENT_TIMESTAMP })
    created_at!: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => CURRENT_TIMESTAMP, onUpdate: CURRENT_TIMESTAMP })
    updated_at!: Date;

    // --- Relations ---
    @ManyToOne(() => User, (user) => user.blogs, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @OneToMany(() => Comment, (comment) => comment.blog)
    comments!: Comment[];

    @ManyToOne(() => Category, (category) => category.blogs, { eager: true, onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'category_id' })
    category!: Category;
}