import { ApiProperty } from '@nestjs/swagger'
import { CourseType } from '../schemas/course.schema'
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UpdateCourseDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  image: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ each: true })
  ageRange: string[]

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ each: true })
  preRequisites: string[]

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ each: true })
  objectives: string[]

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsEnum(CourseType)
  type: CourseType
}
