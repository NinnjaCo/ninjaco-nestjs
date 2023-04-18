import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'

export class CreateMissionManagementDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  missionId: string // missionId from the missions table

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  completed: boolean

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  startedAt: string
}
