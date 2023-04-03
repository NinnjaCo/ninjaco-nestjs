import { MailerModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { Module } from '@nestjs/common'
import { MailService } from './mail.service'
import { join } from 'path'
import { ConfigService } from '@nestjs/config'

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('MAIL_HOST'),
          port: configService.get('MAIL_PORT'),
          ignoreTLS: configService.get('MAIL_IGNORE_TLS'),
          secure: configService.get('MAIL_SECURE'),
          auth: {
            user: configService.get('MAIL_USERNAME') || '',
            pass: configService.get('MAIL_PASSWORD') || '',
          },
        },
        defaults: {
          from: '"NinjaCo" <noreply@ninjaco.com>',
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
