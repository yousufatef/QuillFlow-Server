// dto/create-role.dto.ts
import { IsNotEmpty, MaxLength, MinLength, IsArray, ValidateNested, ArrayMinSize } from "class-validator";
import { Type } from "class-transformer";
import { PermissionAuthoritiesDto } from "./permission-authorities.dto";

export class CreateRoleDto {
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    name!: string;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => PermissionAuthoritiesDto)
    permissions!: PermissionAuthoritiesDto[];
}