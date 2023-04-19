import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'

export class CreateLevelManagementDto {
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  completed: boolean

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  startedAt: string
}
