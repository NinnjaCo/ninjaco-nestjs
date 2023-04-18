import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateLevelProgressDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  progress: string
}
