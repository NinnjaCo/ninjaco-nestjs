import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'
export class UpdateLevelManagementDto {
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  completed: boolean
}
