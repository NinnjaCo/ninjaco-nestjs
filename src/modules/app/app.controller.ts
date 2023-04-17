import { ApiGlobalResponse } from '../../common/decorators/api-global-response.decorators'
import { ApiTags } from '@nestjs/swagger'
import { Controller, Get } from '@nestjs/common'
import { Public } from '../../common/decorators/public.decorator'
import { SkipThrottle, Throttle } from '@nestjs/throttler'
import { StringSchema } from 'swagger/swagger-primitive-type'

@Controller()
@ApiTags('Health')
export class AppController {
  @Public()
  @ApiGlobalResponse(StringSchema, {
    description: 'OK',
  })
  @Throttle(200, 60) // 100 requests per minute
  @Get('health')
  health() {
    return 'OK'
  }
}
