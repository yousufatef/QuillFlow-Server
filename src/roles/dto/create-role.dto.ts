// dto/create-role.dto.ts
import { IsNotEmpty, Length, IsArray, ValidateNested, IsString, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { PermissionAuthoritiesDto } from "./permission-authorities.dto";
import { i18nValidationMessage } from "nestjs-i18n";

export class CreateRoleDto {
    @IsString({ message: i18nValidationMessage('validation.nameEnString') })
    @IsNotEmpty({ message: i18nValidationMessage('validation.nameEnRequired') })
    @Length(2, 100, { message: i18nValidationMessage('validation.nameEnLength') })
    nameEn!: string;

    @IsString({ message: i18nValidationMessage('validation.nameArString') })
    @IsNotEmpty({ message: i18nValidationMessage('validation.nameArRequired') })
    @Length(2, 100, { message: i18nValidationMessage('validation.nameArLength') })
    nameAr!: string;

    @IsOptional()
    @IsArray({ message: i18nValidationMessage('validation.isArray') })
    @ValidateNested({ each: true })
    @Type(() => PermissionAuthoritiesDto)
    permissions?: PermissionAuthoritiesDto[];
}
