import { Body, Post } from '@nestjs/common'
import { Controller } from '@nestjs/common'
import { EmailEnum } from './mail.enum'
import { MailService } from './mail.service'
import { sendEmailDto } from 'modules/mail/dto/send-email.dto'

@Controller('send-email')
export class MailController {
  constructor(private readonly mailService: MailService) {}
  @Post()
  async sendEmail(@Body() body: sendEmailDto): Promise<boolean> {
    if (body.emailEnum === EmailEnum.NOTIFY) {
      return this.mailService.sendNotifyUserEmail(body)
    } else if (body.emailEnum === EmailEnum.DELETE) {
      return this.mailService.sendDeleteUserEmail(body)
    } else if (body.emailEnum === EmailEnum.RESET) {
      return this.mailService.sendResetPasswordEmail(body)
    }
  }
}
