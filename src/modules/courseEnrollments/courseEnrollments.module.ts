import { CourseEnrollment, CourseEnrollmentSchema } from './schemas/courseEnrollment.schema'
import { CourseEnrollmentsController } from './courseEnrollments.controller'
import { CourseEnrollmentsRepository } from './courseEnrollments.repository'
import { CourseEnrollmentsService } from './courseEnrollments.service'
import { CoursesModule } from '../courses/courses.module'
import { LevelManagement, LevelManagementSchema } from './schemas/LevelManagement.schema'
import { MissionManagement, MissionManagementSchema } from './schemas/MissionManagement.schema'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserLevelProgressModule } from '../usersLevelsProgress/usersLevelsProgress.module'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CourseEnrollment.name, schema: CourseEnrollmentSchema }]),
    MongooseModule.forFeature([{ name: MissionManagement.name, schema: MissionManagementSchema }]),
    MongooseModule.forFeature([{ name: LevelManagement.name, schema: LevelManagementSchema }]),
    CoursesModule,
    UsersModule,
    UserLevelProgressModule,
  ],
  controllers: [CourseEnrollmentsController],
  providers: [CourseEnrollmentsService, CourseEnrollmentsRepository],
  exports: [CourseEnrollmentsService],
})
export class CoursesEnrollmentModule {}
