import { ConfigService } from '@nestjs/config'
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

  async sendWelcomeEmail(receiverEmail: string) {
    try {
      await this.mailerService.sendMail({
        to: receiverEmail,
        subject: 'Welcome to NinjaCo!',
        template: './welcome', // `.hbs` extension is appended automatically
        context: {},
      })
      return true
    } catch (error) {
      console.log(error)
      return false
    }
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
  async sendDeleteUserEmail(sendDto: sendEmailDto) {
    console.log('inside mail service, thhe sendDto is:', sendDto)
    const message = sendDto.message
    try {
      await this.mailerService.sendMail({
        to: sendDto.email,
        subject: '',
        template: './deleteUserEmail',
        context: { message },
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
  async sendResetPasswordEmail(sendDto: sendEmailDto) {
    try {
      await this.mailerService.sendMail({
        to: sendDto.email,
        subject: '',
        template: './resetPasswordEmail',
        context: {},
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
  async sendNotifyUserEmail(sendDto: sendEmailDto) {
    const message = sendDto.message
    try {
      await this.mailerService.sendMail({
        to: sendDto.email,
        subject: '',
        template: './notifyUserEmail',
        context: { message },
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
