// dto/update-comment.dto.ts
import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class UpdateCommentDto {
    @IsString({ message: i18nValidationMessage('validation.isString') })
    @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
    @MinLength(10, { message: i18nValidationMessage('validation.commentMinLength') })
    content!: string;
}
