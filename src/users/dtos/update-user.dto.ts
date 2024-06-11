import { IsEmail, IsOptional, IsString, IsStrongPassword } from "class-validator";



export class UpdateUserDto {

    @IsString()
    @IsOptional()
    username :string

    @IsEmail()
    @IsOptional()
    email :string


    @IsString()
    @IsStrongPassword()
    @IsOptional()
    password :string;


}