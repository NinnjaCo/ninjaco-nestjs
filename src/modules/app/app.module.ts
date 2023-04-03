import { AppController } from './app.controller'
import { LoggerMiddleware } from '../../common/middleware/logger.middleware'
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'

@Module({
  imports: [],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
