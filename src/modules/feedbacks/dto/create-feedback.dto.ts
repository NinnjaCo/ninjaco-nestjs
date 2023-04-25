import { ApiProperty } from '@nestjs/swagger'
import { Course } from 'modules/courses/schemas/course.schema'
import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator'
import { Level } from 'modules/courses/schemas/level.schema'
import { Mission } from 'modules/courses/schemas/mission.schema'
import { User } from 'modules/users/schemas/user.schema'

export class CreateFeedbackDto {
  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  author: User

  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  level: Level

  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  course: Course

  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  mission: Mission

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  rating: number

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  message: string
}
