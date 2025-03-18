import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    @IsStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, })
    @IsString()
    password!: string;

    @IsEmail()
    email!: string;
}
