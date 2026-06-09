import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsOptional, IsPositive, IsString, Length, MaxLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    @IsOptional()
    @Length(2, 150)
    username?: string;

    @IsString()
    @IsOptional()
    @Length(8, 128)
    password?: string;

    @IsInt()
    @IsPositive()
    @IsOptional()
    roleId?: number;
}
