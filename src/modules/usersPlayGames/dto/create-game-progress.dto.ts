import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateUserPlayGameDto {
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
  @IsNotEmpty()
  @IsString()
  progress: string
}
