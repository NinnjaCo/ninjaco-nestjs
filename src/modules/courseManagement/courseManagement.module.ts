import { Course, CourseSchema } from 'modules/courses/schemas/course.schema'
import { CourseManagementController } from './courseManagement.controller'
import { CourseManagementRepository } from './courseMangement.repository'
import { CourseManagementService } from './courseManagement.service'
import { CoursesModule } from 'modules/courses/courses.module'
import { CoursesService } from 'modules/courses/courses.service'
import { LevelManagement, LevelManagementSchema } from './schemas/LevelManagement.schema'
import { MissionManagement, MissionManagementSchema } from './schemas/MissionManagement.schema'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { User_enroll_course, User_enroll_courseSchema } from './schemas/User_enroll_course.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User_enroll_course.name, schema: User_enroll_courseSchema },
    ]),
    MongooseModule.forFeature([{ name: MissionManagement.name, schema: MissionManagementSchema }]),
    MongooseModule.forFeature([{ name: LevelManagement.name, schema: LevelManagementSchema }]),
    CoursesModule,
  ],
  controllers: [CourseManagementController],
  providers: [CourseManagementService, CourseManagementRepository, CoursesService, Course],
  exports: [CourseManagementService],
})
export class CourseManagementModule {}
