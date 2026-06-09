import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Length } from 'class-validator';

export class CreateUserDto {

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