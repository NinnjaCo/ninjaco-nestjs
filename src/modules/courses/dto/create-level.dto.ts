import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateLevelDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  levelNumber: number

  @ApiProperty()
  @IsString({ each: true })
  @IsOptional()
  @IsNotEmpty()
  buildingPartsImages: string[]

  @ApiProperty()
  @IsString({ each: true })
  @IsOptional()
  @IsNotEmpty()
  stepGuideImages: string[]

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  websitePreviewImage: string
}
