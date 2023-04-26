import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator'

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firstName: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastName: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsDateString()
  dateOfBirth: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  password: string

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  points: number

  @IsOptional()
  profilePicture: string | undefined

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  points: string
}
