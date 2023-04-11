import { ConfigModule, ConfigService } from '@nestjs/config'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { MailService } from './mail.service'
import { MailerModule } from '@nestjs-modules/mailer'
import { Module } from '@nestjs/common'
import { UsersService } from 'modules/users/users.service'
import { join } from 'path'
import { UsersModule } from 'modules/users/users.module'
import { UsersRepository } from 'modules/users/users.repository'
import { RolesModule } from 'modules/roles/roles.module'
import { RolesService } from 'modules/roles/roles.service'
import { RolesRepository } from 'modules/roles/roles.repository'

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
    ConfigModule,
    UsersModule,
    RolesModule,
  ],
  providers: [MailService, UsersService, UsersRepository, RolesService, RolesRepository],
  exports: [MailService],
})
export class MailModule {}
