import { IsEmail, IsNotEmpty, MinLength, IsOptional, IsString } from 'class-validator'


export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;

    @IsOptional()
    @IsString()
    phoneNumber?: string;
}