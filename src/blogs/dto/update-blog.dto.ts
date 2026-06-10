import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogDto } from './create-blog.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { Type } from 'class-transformer';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {
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
