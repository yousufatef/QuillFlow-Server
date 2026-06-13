// dto/create-comment.dto.ts
import { IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateCommentDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(10, { message: 'Comment must be at least 10 characters long' })
    content!: string;

    @IsOptional()
    @IsInt()
    parent_comment_id?: number;
}