import { ApiProperty } from '@nestjs/swagger'
import { IsJWT, IsMongoId, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class ResetPasswordDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsJWT()
  token: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  userId: string
}
