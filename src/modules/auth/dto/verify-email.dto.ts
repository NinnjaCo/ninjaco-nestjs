import { ApiProperty } from '@nestjs/swagger'
import { IsJWT, IsNotEmpty, IsString } from 'class-validator'

export class verifyEmailDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsJWT()
  token: string
}
