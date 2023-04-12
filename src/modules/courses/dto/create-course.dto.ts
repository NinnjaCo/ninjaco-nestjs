import { IsNotEmpty, IsString } from 'class-validator'
export class CreateCourseDto {
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
