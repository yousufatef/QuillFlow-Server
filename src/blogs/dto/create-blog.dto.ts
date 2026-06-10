import { IsNotEmpty, IsNumber, IsString, Length, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateBlogDto {

    @IsString({ message: i18nValidationMessage('validation.isString') })
    @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
    @Length(2, 200, { message: i18nValidationMessage('validation.length') })
    title!: string;

    @IsString({ message: i18nValidationMessage('validation.isString') })
    @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
    description!: string;

    @Type(() => Number)
    @IsNumber({}, { message: i18nValidationMessage('validation.isNumber') })
    @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
    categoryId!: number;

    @IsOptional()
    @IsString({ message: i18nValidationMessage('validation.isString') })
    image?: string;
}