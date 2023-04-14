import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateGameDto {
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

  wallsLocations: Array<Array<number>>
}
