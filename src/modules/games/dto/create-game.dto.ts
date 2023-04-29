import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateGameDto {
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
  playerDirection: string

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  numOfBlocks?: number

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  sizeOfGrid: number

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  @IsArray()
  playerLocation: number[]

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  @IsArray()
  goalLocation: number[]

  @ApiProperty()
  @IsArray()
  wallsLocations: number[][]
}
