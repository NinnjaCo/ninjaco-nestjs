import { CourseManagementController } from './courseManagement.controller'
import { CourseManagementRepository } from './courseMangement.repository'
import { CourseManagementService } from './courseManagement.service'
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
  ],
  controllers: [CourseManagementController],
  providers: [CourseManagementService, CourseManagementRepository],
  exports: [CourseManagementService],
})
export class CourseManagementModule {}
