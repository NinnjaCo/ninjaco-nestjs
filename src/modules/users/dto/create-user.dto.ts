import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { RoleEnum } from 'modules/roles/roles.enum'

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

  @IsOptional()
  @IsString()
  @IsEnum(RoleEnum)
  role?: RoleEnum
}
