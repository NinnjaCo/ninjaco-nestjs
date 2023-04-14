import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateGameDto {
  @IsString()
  @IsNotEmpty()
  title: string
  @IsString()
  @IsNotEmpty()
  image: string

  @IsNumber()
  @IsOptional()
  numOfBlocks?: number

  @IsNumber()
  @IsNotEmpty()
  sizeOfGrid: number

  @IsNotEmpty()
  @IsNumber({}, { each: true })
  @IsArray()
  playerLocation: number[]

  @IsNotEmpty()
  @IsNumber({}, { each: true })
  @IsArray()
  goalLocation: number[]

  @IsArray()
  wallsLocations: number[][]
}
