import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class UpdateGameProgressDto {
  @ApiProperty()
  @IsString()
  progress: string
}
