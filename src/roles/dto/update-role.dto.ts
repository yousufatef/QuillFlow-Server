import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';
import { ArrayMinSize, IsArray, IsOptional, MaxLength, MinLength, ValidateNested } from 'class-validator';
import { PermissionAuthoritiesDto } from './permission-authorities.dto';
import { Type } from 'class-transformer';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
    @IsOptional()
    @MinLength(3)
    @MaxLength(50)
    name?: string;

    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => PermissionAuthoritiesDto)
    permissions?: PermissionAuthoritiesDto[];
}