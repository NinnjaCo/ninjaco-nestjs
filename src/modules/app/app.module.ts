import { AppController } from './app.controller'
import { ConfigModule } from '@nestjs/config'
import { LoggerMiddleware } from '../../common/middleware/logger.middleware'
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { validateConfig } from 'modules/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate: (config: Record<string, any>) => {
        return validateConfig(config)
      },
    }),
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
