import { APP_GUARD } from '@nestjs/core'
import { AppController } from './app.controller'
import { AtGuard } from '../auth/guards/at.guard'
import { AuthModule } from '../auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from '../../database/database.module'
import { FileUploadModule } from '../files/file-upload.module'
import { LoggerMiddleware } from '../../common/middleware/logger.middleware'
import { MailModule } from '../mail/mail.module'
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { MinioClientModule } from '../minio/minio-client.module'
import { RolesGuard } from 'modules/roles/roles.guard'
import { RolesModule } from 'modules/roles/roles.module'
import { UsersModule } from '../users/users.module'
import { validateConfig } from '../config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate: (config: Record<string, any>) => {
        return validateConfig(config)
      },
    }),
    MailModule,
    MinioClientModule,
    FileUploadModule,
    DatabaseModule,
    AuthModule,
    UsersModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
