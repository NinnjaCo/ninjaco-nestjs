import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator'

export class sendEmailDto {
  @ApiProperty()
  @IsString()
  @IsEnum(['delete', 'reset', 'notify'])
  emailEnum: string

  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  message: string
}
