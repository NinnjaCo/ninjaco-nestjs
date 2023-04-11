import { ApiProperty } from '@nestjs/swagger'
import { EmailEnum } from '../mail.enum'
import { IsEmail, IsEnum, IsString } from 'class-validator'

export class sendEmailDto {
  @ApiProperty()
  @IsString()
  @IsEnum(EmailEnum)
  emailType: EmailEnum

  @ApiProperty()
  @IsString()
  @IsEmail()
  receiverEmail: string

  @ApiProperty()
  @IsString()
  message: string
}
