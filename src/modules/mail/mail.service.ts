import { ConfigService } from '@nestjs/config'
import { EmailEnum } from './mail.enum'
import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'
import { User } from '../users/schemas/user.schema'
import { sendEmailDto } from '../mail/dto/send-email.dto'
@Injectable()
export class MailService {
  private readonly APP_URL: string
  constructor(private mailerService: MailerService, private configService: ConfigService) {
    this.APP_URL = this.configService.get('APP_URL')
  }

  /**
   * Sends a forgot password email to the user
   * @param user
   * @param token
   * @returns {Promise<boolean>}
   * @memberof MailService
   * @description This method is called from the auth.service.ts to send a forgot password email to the user
   */
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
      })
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  /**
   * Sends a verify email to the user
   * @param user
   * @param token
   * @returns {Promise<boolean>}
   * @memberof MailService
   * @description This method is called from the auth.service.ts to send a verify email to the user
   */
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
      })
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  /**
   * Retrieve the template name and subject from the email type
   * @param emailType
   * @private
   * @returns {templateName: string, subject: string}
   * @memberof MailService
   * @description This method is called from the sendEmail method to retrieve the template name and subject from the email type
   */
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

  /**
   * Sends an email to the user
   * @param sendDto
   * @returns {Promise<boolean>}
   * @memberof MailService
   * @description This method is called from the mail.controller.ts to send an email to the user, usually from the admin
   */
  async sendEmail(sendDto: sendEmailDto) {
    const tempalteNameAndSubject = this.getTempalteNameFromEmailType(sendDto.emailType)
    try {
      await this.mailerService.sendMail({
        to: sendDto.receiverEmail,
        subject: tempalteNameAndSubject.subject,
        template: tempalteNameAndSubject.templateName,
        context: { email: sendDto.receiverEmail, message: sendDto.message },
      })
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }
}
