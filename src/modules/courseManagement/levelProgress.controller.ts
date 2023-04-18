import { ApiGlobalResponse } from 'common/decorators/api-global-response.decorators'
import { ApiTags } from '@nestjs/swagger'
import { Controller } from '@nestjs/common'

@ApiTags('LeveLProgress')
@Controller('levelProgress')
export class LevelProgressController {}
