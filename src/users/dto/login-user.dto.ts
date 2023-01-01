import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
