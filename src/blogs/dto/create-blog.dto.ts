import { IsNotEmpty, IsNumber, IsString, Length, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateBlogDto {
    @IsString({ message: i18nValidationMessage('validation.nameEnString') })
    @IsNotEmpty({ message: i18nValidationMessage('validation.nameEnRequired') })
    @Length(2, 200, { message: i18nValidationMessage('validation.nameEnLength') })
    nameEn!: string;

    @IsString({ message: i18nValidationMessage('validation.nameArString') })
    @IsNotEmpty({ message: i18nValidationMessage('validation.nameArRequired') })
    @Length(2, 200, { message: i18nValidationMessage('validation.nameArLength') })
    nameAr!: string;

    @IsString({ message: i18nValidationMessage('validation.descriptionEnString') })
    @IsNotEmpty({ message: i18nValidationMessage('validation.descriptionEnRequired') })
    descriptionEn!: string;

    @IsString({ message: i18nValidationMessage('validation.descriptionArString') })
    @IsNotEmpty({ message: i18nValidationMessage('validation.descriptionArRequired') })
    descriptionAr!: string;

    @Type(() => Number)
    @IsNumber({}, { message: i18nValidationMessage('validation.categoryIdNumber') })
    @IsNotEmpty({ message: i18nValidationMessage('validation.categoryIdRequired') })
    categoryId!: number;

    @IsOptional()
    @IsString({ message: i18nValidationMessage('validation.fileString') })
    image?: string;
}
