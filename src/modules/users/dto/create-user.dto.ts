import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CreateUsersDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}
