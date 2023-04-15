import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateLevelDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  levelNumber: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ each: true })
  @IsNotEmpty()
  buildingPartsImages: string[]

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ each: true })
  @IsNotEmpty()
  stepGuideImages: string[]
}
