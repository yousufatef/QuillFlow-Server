import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Length } from 'class-validator';

export class CreateAdminDto {

    @IsString()
    @IsOptional()
    @Length(2, 150)
    username?: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    @Length(5, 255)
    email: string;

    @IsInt()
    @IsPositive()
    @IsOptional()
    roleId?: number;
}