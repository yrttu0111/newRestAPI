import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginInputDto {
    @IsEmail()
    email: string;

    @Length(3, 20)
    @IsNotEmpty()
    password: string;
}
