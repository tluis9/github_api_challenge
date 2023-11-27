import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateUserDto{
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsOptional()
    currentPassword: string;

    @IsOptional()
    newPassword: string;

    @IsNotEmpty()
    userTag: string;
}