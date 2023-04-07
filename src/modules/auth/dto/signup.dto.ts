import { ApiProperty } from '@nestjs/swagger'
import {
  IsAlphanumeric,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator'

export class SignUpDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsAlphanumeric()
  firstName: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsAlphanumeric()
  lastName: string

  @ApiProperty({ type: Date, example: '2021-01-01T00:00:00.000Z' })
  @IsString()
  @IsNotEmpty()
  @IsDateString()
  dateOfBirth: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string
}
