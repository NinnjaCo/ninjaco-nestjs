import { Body, Post } from '@nestjs/common'
import { Controller } from '@nestjs/common'
import { MailService } from './mail.service'
import { sendEmailDto } from 'modules/mail/dto/send-email.dto'

@Controller('/send-email')
export class mailController {
  constructor(private readonly mailService: MailService) {}
  @Post('delete-user')
  async sendDeleteUserEmail(@Body() body: sendEmailDto): Promise<boolean> {
    console.log('inside auth controller, the sendEmailDto (BODY) is ', body)
    return this.mailService.sendDeleteUserEmail(body)
  }
  @Post('reset-password')
  async sendResetPasswordEmail(@Body() body: sendEmailDto): Promise<boolean> {
    return this.mailService.sendResetPasswordEmail(body)
  }
  @Post('notify-user')
  async sendNotifyUserEmail(@Body() body: sendEmailDto): Promise<boolean> {
    return this.mailService.sendNotifyUserEmail(body)
  }
}
