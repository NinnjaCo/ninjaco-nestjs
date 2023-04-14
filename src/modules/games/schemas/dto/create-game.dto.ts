import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { number, string } from 'joi'

export class CreateGamesDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsNumber()
  @IsOptional()
  numOfBlocks?: number

  @IsNumber()
  @IsNotEmpty()
  sizeOfGrid: number

  @IsNotEmpty()
  playerLocation: Array<number>

  @IsNotEmpty()
  goalLocation: Array<number>

  @IsNotEmpty()
  wallsLocations: Array<Array<number>>
}
