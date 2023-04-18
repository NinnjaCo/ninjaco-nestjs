import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'
import { Mission } from 'modules/courses/schemas/mission.schema'

export class CreateMissionManagementDto {
  @ApiProperty()
  @IsNotEmpty()
  mission: Mission

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  completed: boolean

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  startedAt: string
}
