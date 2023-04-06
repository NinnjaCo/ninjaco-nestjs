import { AtStrategy } from './strategies/at.strategy'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { Module } from '@nestjs/common'
import { RtStrategy } from './strategies/rt.strategy'
import { UsersModule } from 'modules/users/users.module'

@Module({
  imports: [JwtModule.register({}), UsersModule],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy],
})
export class AuthModule {}
