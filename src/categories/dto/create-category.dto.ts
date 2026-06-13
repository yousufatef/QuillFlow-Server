import { IsNotEmpty, IsString, Length } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class CreateCategoryDto {
    @IsString({ message: i18nValidationMessage('validation.nameEnString') })
    @IsNotEmpty({ message: i18nValidationMessage('validation.nameEnRequired') })
    @Length(2, 100, { message: i18nValidationMessage('validation.nameEnLength') })
    nameEn!: string;

    @IsString({ message: i18nValidationMessage('validation.nameArString') })
    @IsNotEmpty({ message: i18nValidationMessage('validation.nameArRequired') })
    @Length(2, 100, { message: i18nValidationMessage('validation.nameArLength') })
    nameAr!: string;
}
