import { IsNotEmpty, IsNumber, IsString, Length, Min } from "class-validator";
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateProductDto {

    @IsString({ message: i18nValidationMessage('validation.isString') })
    @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
    @Length(2, 150, { message: i18nValidationMessage('validation.length') })
    title!: string;

    @IsString({ message: i18nValidationMessage('validation.isString') })
    description!: string;

    @IsNumber({}, { message: i18nValidationMessage('validation.isNumber') })
    @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
    @Min(0, { message: i18nValidationMessage('validation.min') })
    price!: number;

}
