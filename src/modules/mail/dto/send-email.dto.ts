import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsJWT, IsNotEmpty, IsString } from 'class-validator'

export class sendEmailDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsString()
  message: string
}
