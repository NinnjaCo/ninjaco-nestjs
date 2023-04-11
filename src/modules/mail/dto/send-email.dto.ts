import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsJWT, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class sendEmailDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  message: string
}
