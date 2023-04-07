import { IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CreateUsersDto {
  @IsString()
  @IsNotEmpty()
  firstName: string

  @IsString()
  @IsNotEmpty()
  lastName: string

  @IsString()
  @IsNotEmpty()
  @IsDateString()
  dateOfBirth: string

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}
