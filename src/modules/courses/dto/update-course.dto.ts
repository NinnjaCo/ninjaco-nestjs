import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UpdateCourseDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  image: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  ageRange: string

  @IsString()
  @IsOptional()
  preRequisites: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  objectives: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  type: string
}