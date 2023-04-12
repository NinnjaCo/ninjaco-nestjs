import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UpdateCourseDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsString()
  @IsNotEmpty()
  image: string

  @IsString()
  @IsNotEmpty()
  ageRange: string

  @IsString()
  preRequisites: string

  @IsString()
  @IsNotEmpty()
  objectives: string

  @IsString()
  @IsNotEmpty()
  type: string
}
