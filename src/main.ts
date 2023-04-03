import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app/app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as bodyParser from 'body-parser'
import { HttpException, HttpStatus, ValidationError, ValidationPipe } from '@nestjs/common'
import { AllExceptionsFilter } from './common/filters/all-exception.filter'
import { HttpResponseInterceptor } from './common/interceptors/http-response.interceptor'
import helmet from 'helmet'

/**
 * Bootstrap the NestJS application
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

  // Add validation pipes for class-validator and class-transformer packages
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: (errors: ValidationError[]) =>
        new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            errors: errors.reduce(
              (accumulator, currentValue) => ({
                ...accumulator,
                [currentValue.property]: Object.values(currentValue.constraints).join(', '),
              }),
              {}
            ),
          },
          HttpStatus.BAD_REQUEST
        ),
    })
  )

  // Use global exception filter
  app.useGlobalFilters(new AllExceptionsFilter())

  // Http Request Interceptor
  app.useGlobalInterceptors(new HttpResponseInterceptor())

  // Security Measures
  app.enable('trust proxy')
  app.use(helmet())

  // localhost:3000 is NextJS frontend
  // TODO replace it with list of allowed cros origin from .env
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization, Accept',
    credentials: true,
  })
  await app.listen(3200)
}
bootstrap()
