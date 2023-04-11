import { ConfigService } from '@nestjs/config'
import { EmailEnum } from './mail.enum'
import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'
import { User } from 'modules/users/schemas/user.schema'
import { sendEmailDto } from 'modules/mail/dto/send-email.dto'
@Injectable()
export class MailService {
  private readonly APP_URL
  constructor(private mailerService: MailerService, private configService: ConfigService) {
    this.APP_URL = this.configService.get('APP_URL')
  }

  async sendForgotPasswordMail(user: User, token: string) {
    const url = `${this.APP_URL}/auth/reset-password/${token}`
    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Reset your password | NinjaCo',
        template: './forgotpassword', // `.hbs` extension is appended automatically
        context: {
          url,
        },
        attachments: [
          {
            filename: 'logo.svg',
            path: __dirname + '/templates/logo.svg',
            cid: 'logo',
          },
        ],
      })
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async sendVerifyEmail(user: User, token: string) {
    const url = `${this.APP_URL}/auth/verify-email/${token}`
    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Verify your email | NinjaCo',
        template: './verifyemail',
        context: {
          url,
        },
        attachments: [
          {
            filename: 'logo.svg',
            path: __dirname + '/templates/logo.svg',
            cid: 'logo',
          },
        ],
      })
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  private getTempalteNameFromEmailType(emailType: EmailEnum) {
    switch (emailType) {
      case EmailEnum.NOTIFY:
        return {
          templateName: './notifyUserEmail',
          subject: 'New Notification From Ninjaco | NinjaCO',
        }
      case EmailEnum.DELETE:
        return {
          templateName: './deleteUserEmail',
          subject: 'Your account has been deleted | NinjaCO',
        }
      case EmailEnum.RESET:
        return {
          templateName: './resetPasswordEmail',
          subject: 'Your password has been reset | NinjaCO',
        }
    }
  }

  async sendEmail(sendDto: sendEmailDto) {
    const tempalteNameAndSubject = this.getTempalteNameFromEmailType(sendDto.emailType)
    try {
      await this.mailerService.sendMail({
        to: sendDto.receiverEmail,
        subject: tempalteNameAndSubject.subject,
        template: tempalteNameAndSubject.templateName,
        context: { email: sendDto.receiverEmail, message: sendDto.message },
        attachments: [
          {
            filename: 'logo.svg',
            path: __dirname + '/templates/logo.svg',
            cid: 'logo',
          },
        ],
      })
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }
}
