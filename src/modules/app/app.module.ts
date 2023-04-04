import { AppController } from './app.controller'
import { AuthModule } from 'modules/auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from 'database/database.module'
import { FileUploadModule } from 'modules/files/file-upload.module'
import { LoggerMiddleware } from '../../common/middleware/logger.middleware'
import { MailModule } from '../mail/mail.module'
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { MinioClientModule } from '../minio/minio-client.module'
import { UsersModule } from 'modules/users/users.module'
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
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
