import { ApiProperty } from '@nestjs/swagger'
import { CourseType } from '../schemas/course.schema'
import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { Mission } from '../schemas/mission.schema'

export class CreateCourseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  image: string

  @ApiProperty()
  @IsString({ each: true })
  @IsNotEmpty()
  ageRange: string[]

  @ApiProperty()
  @IsString({ each: true })
  @IsNotEmpty()
  preRequisites: string[]

  @ApiProperty()
  @IsString({ each: true })
  @IsNotEmpty()
  objectives: string[]

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEnum(CourseType)
  type: CourseType
}
