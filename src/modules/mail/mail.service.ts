import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendWelcomeEmail(receiverEmail: string) {
    await this.mailerService.sendMail({
      to: receiverEmail,
      subject: 'Welcome to NinjaCo!',
      template: './welcome', // `.hbs` extension is appended automatically
      context: {},
    })
  }
}
