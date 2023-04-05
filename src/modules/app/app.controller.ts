import { ApiGlobalResponse } from '../../common/decorators/api-global-response.decorators'
import { ApiTags } from '@nestjs/swagger'
import { Controller, Get } from '@nestjs/common'
import { Public } from '../../common/decorators/public.decorator'

@Controller()
@ApiTags('Health')
export class AppController {
  @Public()
  @ApiGlobalResponse(String, {
    description: 'OK',
  })
  @Get('health')
  health() {
    return 'OK'
  }
}
