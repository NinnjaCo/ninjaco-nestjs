import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator'
export class UpdateLevelManagementDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  completed: boolean
}
