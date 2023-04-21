import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
export class CreateLevelManagementDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  levelId: string
}
