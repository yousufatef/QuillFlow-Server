import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { CURRENT_TIMESTAMP } from "../../utils/constants";
import { User } from "../../users/entities/user.entity";
import { Blog } from "../../blogs/entities/blog.entity";


@Entity({ name: 'comments' })
export class Comment {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'text' })
    content!: string;

    @Column({ nullable: true, type: 'boolean', default: false })
    is_edited!: boolean;

    @Column({ nullable: true })
    parent_comment_id!: number; // for nested/reply comments

    @CreateDateColumn({ type: 'timestamp', default: () => CURRENT_TIMESTAMP })
    created_at!: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => CURRENT_TIMESTAMP, onUpdate: CURRENT_TIMESTAMP })
    updated_at!: Date;

    // --- Relations ---
    @ManyToOne(() => User, (user) => user.comments, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @ManyToOne(() => Blog, (blog) => blog.comments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'blog_id' })
    blog!: Blog;
}