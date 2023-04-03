import { ApiGlobalResponse } from '../../common/decorators/api-global-response.decorators'
import { ApiTags } from '@nestjs/swagger'
import { Controller, Get } from '@nestjs/common'

@Controller()
@ApiTags('Health')
export class AppController {
  @ApiGlobalResponse(String, {
    description: 'OK',
  })
  @Get('health')
  health() {
    return 'OK'
  }
}
