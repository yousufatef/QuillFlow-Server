import { IsNumber, IsBoolean, IsOptional, IsNotEmpty } from "class-validator";

export class PermissionAuthoritiesDto {
    @IsNumber()
    @IsNotEmpty()
    permissionId!: number;

    @IsBoolean()
    @IsOptional()
    canCreate?: boolean;

    @IsBoolean()
    @IsOptional()
    canRead?: boolean;

    @IsBoolean()
    @IsOptional()
    canUpdate?: boolean;

    @IsBoolean()
    @IsOptional()
    canDelete?: boolean;
}