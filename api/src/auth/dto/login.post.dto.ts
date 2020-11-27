import {IsEmail, IsNotEmpty, IsString} from 'class-validator';

export class LoginPostDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
