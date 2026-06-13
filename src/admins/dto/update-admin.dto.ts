import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Length } from 'class-validator';
import { CreateAdminDto } from './create-admin.dto';
import { i18nValidationMessage } from 'nestjs-i18n';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
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
