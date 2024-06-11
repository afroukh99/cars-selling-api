import { IsEmail, IsOptional, IsString, IsStrongPassword } from "class-validator";



export class CreateUserDto {

    @IsString()
    @IsOptional()
    username : string;

    @IsEmail()
    email : string;

    @IsStrongPassword()
    password : string;

}