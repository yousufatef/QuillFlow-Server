// blogs/dto/blog-response.dto.ts
import { Expose, Type, Exclude } from 'class-transformer';

class UserInBlogDto {
    @Expose() id!: number;
    @Expose() username!: string;
    @Expose() profileImage!: string | null;
}

class CategoryInBlogDto {
    @Expose() id!: number;
    @Expose() nameEn!: string;
    @Expose() nameAr!: string;
}

export class BlogResponseDto {
    @Expose() id!: number;
    @Expose() nameEn!: string;
    @Expose() nameAr!: string;
    @Expose() descriptionEn!: string;
    @Expose() descriptionAr!: string;
    @Expose() coverImage!: string | null;
    @Expose() is_published!: boolean;
    @Expose() created_at!: Date;

    @Expose()
    @Type(() => UserInBlogDto)
    user!: UserInBlogDto;

    @Expose()
    @Type(() => CategoryInBlogDto)
    category!: CategoryInBlogDto | null;
}
