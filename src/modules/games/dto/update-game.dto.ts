import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

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
  wallsLocations: number[][]
}
