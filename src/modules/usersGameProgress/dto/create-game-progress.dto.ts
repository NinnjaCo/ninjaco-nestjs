import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateGameProgressDto {
  @ApiProperty()
  @IsString()
  userId: string

  @ApiProperty()
  @IsString()
  gameId: string

  @ApiProperty()
  @IsString()
  progress: string
}
