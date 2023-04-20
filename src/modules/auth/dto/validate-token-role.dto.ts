import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsEnum, IsJWT, IsNotEmpty, IsString } from 'class-validator'
import { RoleEnum } from '../../roles/roles.enum'

export class ValidateTokenRoleDto {
  @ApiProperty({
    description: 'Allowed roles',
    isArray: true,
    enum: RoleEnum,
  })
  @IsEnum(RoleEnum, { each: true })
  alloweRoles: RoleEnum[]

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsJWT()
  token: string
}
