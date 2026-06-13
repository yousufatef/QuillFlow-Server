import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Length, Min } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateAdminDto {

    @IsString({ message: i18nValidationMessage('validation.isString') })
    @Length(2, 150, { message: i18nValidationMessage('validation.usernameLength') })
    username?: string;

    @IsString({ message: i18nValidationMessage('validation.isString') })
    @IsNotEmpty({ message: i18nValidationMessage('validation.passwordRequired') })
    @Length(8, 128, { message: i18nValidationMessage('validation.passwordLength') })
    password!: string;

    @IsString({ message: i18nValidationMessage('validation.isString') })
    @IsEmail({}, { message: i18nValidationMessage('validation.isEmail') })
    @IsNotEmpty({ message: i18nValidationMessage('validation.emailRequired') })
    @Length(5, 255, { message: i18nValidationMessage('validation.emailLength') })
    email!: string;

    @IsInt({ message: i18nValidationMessage('validation.roleIdInt') })
    @IsPositive({ message: i18nValidationMessage('validation.roleIdPositive') })
    @IsOptional()
    roleId?: number;
}
