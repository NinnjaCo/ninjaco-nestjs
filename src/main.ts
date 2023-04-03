import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app/app.module'
import { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.enableShutdownHooks()
  await app.listen(3200)
}
bootstrap()
