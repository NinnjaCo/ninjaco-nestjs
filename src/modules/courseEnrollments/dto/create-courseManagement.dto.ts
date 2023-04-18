import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsObject, IsString } from 'class-validator'

export class CreateCourseManagementDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  enrolledAt: string

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  completed: boolean
}
