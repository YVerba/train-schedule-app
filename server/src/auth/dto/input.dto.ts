import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class InputDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
