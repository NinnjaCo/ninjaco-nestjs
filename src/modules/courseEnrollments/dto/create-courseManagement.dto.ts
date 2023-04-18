import { ApiProperty } from '@nestjs/swagger'
import { Course } from 'modules/courses/schemas/course.schema'
import { IsBoolean, IsNotEmpty, IsObject, IsString } from 'class-validator'
import { User } from 'modules/users/schemas/user.schema'

export class CreateCourseManagementDto {
  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  user: User

  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  course: Course

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  enrolledAt: string

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  completed: boolean
}
