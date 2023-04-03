import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app/app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as bodyParser from 'body-parser'

/**
 * Bootstrap the NestJS application
 *
 * @returns {Promise<void>}
 * @memberof Main
 * @method bootstrap
 */
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  // Enable shutdown hooks
  app.enableShutdownHooks()

  // Body Parser limit
  app.use(bodyParser.json({ limit: '5mb' }))
  app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }))

  // Globale Prefix /api/...
  app.setGlobalPrefix('api')

  await app.listen(3200)
}
bootstrap()
