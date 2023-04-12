import { IsArray, IsNotEmpty, IsNumber, IsOptional } from 'class-validator'
export class UpdateLevelDto {
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  levelNumber: number

  @IsOptional()
  @IsArray()
  @IsNotEmpty()
  buildingParts: string[]

  @IsOptional()
  @IsArray()
  @IsNotEmpty()
  stepGuideImage: string[]
}
