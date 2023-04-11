import { Body, Post } from '@nestjs/common'
import { Controller } from '@nestjs/common'
import { MailService } from './mail.service'
import { sendEmailDto } from 'modules/mail/dto/send-email.dto'

@Controller('send-email')
export class MailController {
  constructor(private readonly mailService: MailService) {}
  @Post()
  async sendDeleteUserEmail(@Body() body: sendEmailDto): Promise<boolean> {
    if (body.emailEnum === 'notify') {
      return this.mailService.sendNotifyUserEmail(body)
    } else if (body.emailEnum === 'delete') {
      return this.mailService.sendDeleteUserEmail(body)
    } else {
      return this.mailService.sendResetPasswordEmail(body)
    }
  }
}
