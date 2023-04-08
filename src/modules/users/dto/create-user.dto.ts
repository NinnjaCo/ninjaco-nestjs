import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { Role } from 'modules/roles/schemas/role.schema'

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
  role?: Role
}
