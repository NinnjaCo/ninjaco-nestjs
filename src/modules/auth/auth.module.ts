import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { Module } from '@nestjs/common'

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRATION_TIME') },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
