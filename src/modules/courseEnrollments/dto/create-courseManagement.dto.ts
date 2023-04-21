import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateCourseManagementDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  courseId: string
}
