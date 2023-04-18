import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UpdateMissionManagementDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  missionId: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  completed: boolean

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  startedAt: string
}
