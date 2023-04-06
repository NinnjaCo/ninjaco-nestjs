import { ApiProperty } from '@nestjs/swagger'
import { IsAlphanumeric, IsEmail, IsNotEmpty, IsString } from 'class-validator'

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

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string
}
