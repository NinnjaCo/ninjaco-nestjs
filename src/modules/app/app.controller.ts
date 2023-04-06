import { ApiGlobalResponse } from '../../common/decorators/api-global-response.decorators'
import { ApiTags } from '@nestjs/swagger'
import { Controller, Get } from '@nestjs/common'
import { Public } from '../../common/decorators/public.decorator'
import { StringSchema } from 'swagger/swagger-primitive-type'

@Controller()
@ApiTags('Health')
export class AppController {
  @Public()
  @ApiGlobalResponse(StringSchema, {
    description: 'OK',
  })
  @Get('health')
  health() {
    return 'OK'
  }
}
