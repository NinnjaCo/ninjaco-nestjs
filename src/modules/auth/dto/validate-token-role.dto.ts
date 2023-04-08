import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsJWT, IsNotEmpty, IsString } from 'class-validator'
import { RoleEnum } from 'modules/roles/roles.enum'

export class ValidateTokenRoleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEnum(RoleEnum, { message: 'Invalid role' })
  role: RoleEnum

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsJWT()
  token: string
}
