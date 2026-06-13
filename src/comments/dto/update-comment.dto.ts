// dto/update-comment.dto.ts
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class UpdateCommentDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(10, { message: 'Comment must be at least 10 characters long' })
    content!: string;
}