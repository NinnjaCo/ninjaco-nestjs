import { APP_GUARD } from '@nestjs/core'
import { AppController } from './app.controller'
import { AtGuard } from '../auth/guards/at.guard'
import { AuthModule } from '../auth/auth.module'
import { CategoriesModule } from '../categories/categories.module'
import { ConfigModule } from '@nestjs/config'
import { CoursesModule } from '../courses/courses.module'
import { DatabaseModule } from '../../database/database.module'
import { FileUploadModule } from '../files/file-upload.module'
import { GameProgressModule } from 'modules/usersGameProgress/game-progress.module'
import { GamesModule } from '../games/games.module'
import { LoggerMiddleware } from '../../common/middleware/logger.middleware'
import { MailModule } from '../mail/mail.module'
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { MinioClientModule } from '../minio/minio-client.module'
import { RolesGuard } from '../roles/roles.guard'
import { RolesModule } from '../roles/roles.module'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { UserLevelProgressModule } from '../usersLevelsProgress/usersLevelsProgress.module'
import { UsersModule } from '../users/users.module'
import { UsersPlayGamesModule } from 'modules/usersPlayGames/usersPlayGames.module'
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
    // ratelimits each IP to 120 requests per minute for a single endpoint
    ThrottlerModule.forRoot({
      ttl: 60, // 60 seconds
      limit: 120, // 120 requests
    }),
    MailModule,
    MinioClientModule,
    FileUploadModule,
    DatabaseModule,
    AuthModule,
    UsersModule,
    RolesModule,
    CoursesModule,
    CategoriesModule,
    GamesModule,
    GameProgressModule,
    UsersPlayGamesModule,
    UserLevelProgressModule,
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
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
