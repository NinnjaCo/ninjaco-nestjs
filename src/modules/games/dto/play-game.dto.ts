import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class PlayGameDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  gameId: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  startedAt: Date

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  progress: string

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  completed: boolean
}
