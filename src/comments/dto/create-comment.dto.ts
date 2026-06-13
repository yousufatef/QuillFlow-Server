// dto/create-comment.dto.ts
import { IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class CreateCommentDto {
    @IsString({ message: i18nValidationMessage('validation.isString') })
    @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
    @MinLength(10, { message: i18nValidationMessage('validation.commentMinLength') })
    content!: string;

    @IsOptional()
    @IsInt({ message: i18nValidationMessage('validation.isInt') })
    parent_comment_id?: number;
}
