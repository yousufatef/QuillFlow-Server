import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsOptional, IsPositive, IsString, Length, MaxLength } from 'class-validator';
import { CreateAdminDto } from './create-admin.dto';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
    @IsString()
    @IsOptional()
    @Length(2, 150)
    username: string;

    @IsString()
    @IsOptional()
    @Length(8, 128)
    password: string;

    @IsString()
    @IsOptional()
    @Length(5, 255)
    email: string;

    @IsInt()
    @IsPositive()
    @IsOptional()
    roleId?: number;
}
