import { ApiProperty } from '@nestjs/swagger'
import { Course } from 'modules/courses/schemas/course.schema'
import { IsBoolean, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator'
import { User } from 'modules/users/schemas/user.schema'

export class UpdateCourseMangementDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  @IsNotEmpty()
  user: User

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  @IsNotEmpty()
  course: Course

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  enrolledAt: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  completed: boolean
}
