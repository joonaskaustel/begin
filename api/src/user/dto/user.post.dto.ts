import {IsEmail, IsNotEmpty, IsString, Length, MinLength, ValidateIf} from 'class-validator';

export class UserPostDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string; // if email is already in use check should be done in dto, then it provides same error object

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;

    @ValidateIf((user) => user.confirmPassword !== user.password)
    @Length(1, 0, { message: 'The two provided passwords are different!' }) // a bit hacky but should work
    confirmPassword: string;
}
