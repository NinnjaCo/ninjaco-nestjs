import { ApiGlobalResponse } from '../../common/decorators/api-global-response.decorators'
import { ApiTags } from '@nestjs/swagger'
import { Body, Post } from '@nestjs/common'
import { BooleanSchema } from '../../swagger/swagger-primitive-type'
import { Controller } from '@nestjs/common'
import { MailService } from './mail.service'
import { RoleEnum } from '../roles/roles.enum'
import { Roles } from '../roles/roles.decorator'
import { sendEmailDto } from '../mail/dto/send-email.dto'

@ApiTags('Emails')
@Controller('send-email')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @ApiGlobalResponse(BooleanSchema, {
    description: 'Admin Sends and email to the user | ADMIN only',
  })
  @Roles(RoleEnum.ADMIN)
  @Post()
  async sendEmail(@Body() body: sendEmailDto): Promise<boolean> {
    return await this.mailService.sendEmail(body)
  }
}
