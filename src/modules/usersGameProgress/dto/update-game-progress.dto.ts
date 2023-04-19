import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UpdateGameProgressDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  gameId: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  progress: string

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  completed: boolean
}
