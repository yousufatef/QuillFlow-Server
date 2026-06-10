// blogs/dto/blog-response.dto.ts
import { Expose, Type, Exclude } from 'class-transformer';

class UserInBlogDto {
    @Expose() id: number;
    @Expose() username: string;
    @Expose() profileImage: string | null;
}

class CategoryInBlogDto {
    @Expose() id: number;
    @Expose() name: string;
}

export class BlogResponseDto {
    @Expose() id: number;
    @Expose() title: string;
    @Expose() description: string;
    @Expose() coverImage: string | null;
    @Expose() is_published: boolean;
    @Expose() created_at: Date;

    @Expose()
    @Type(() => UserInBlogDto)
    user: UserInBlogDto;

    @Expose()
    @Type(() => CategoryInBlogDto)
    category: CategoryInBlogDto | null;
}