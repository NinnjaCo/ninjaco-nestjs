import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
export class CreateMissionManagementDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  missionId: string
}
