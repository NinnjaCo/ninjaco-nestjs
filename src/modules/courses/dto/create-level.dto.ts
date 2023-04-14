import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateLevelDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  levelNumber: number

  @ApiProperty()
  @IsString({ each: true })
  @IsNotEmpty()
  buildingPartsImages: string[]

  @ApiProperty()
  @IsString({ each: true })
  @IsNotEmpty()
  stepGuideImages: string[]
}
