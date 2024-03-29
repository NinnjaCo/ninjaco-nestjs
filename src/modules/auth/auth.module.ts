import { AtStrategy } from './strategies/at.strategy'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { MailModule } from '../mail/mail.module'
import { Module } from '@nestjs/common'
import { RolesModule } from '../roles/roles.module'
import { RtStrategy } from './strategies/rt.strategy'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [JwtModule.register({}), UsersModule, MailModule, RolesModule],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy],
})
export class AuthModule {}
