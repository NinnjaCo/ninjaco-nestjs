import { IsArray, IsNotEmpty, IsNumber } from 'class-validator'

export class CreateLevelDto {
  @IsNumber()
  @IsNotEmpty()
  levelNumber: number

  @IsArray()
  @IsNotEmpty()
  buildingParts: string[]

  @IsArray()
  @IsNotEmpty()
  stepGuideImage: string[]
}
