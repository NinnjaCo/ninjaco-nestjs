import { Allow, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateGameDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  image: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  playerDirection: string

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  numOfBlocks?: number

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  sizeOfGrid: number

  @ApiProperty()
  @IsNotEmpty()
  playerLocation: number[]

  @ApiProperty()
  @IsNotEmpty()
  goalLocation: number[]

  @ApiProperty()
  @Allow()
  wallsLocations: number[][]
}
