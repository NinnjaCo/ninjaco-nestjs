import { Course, CourseSchema } from './schemas/course.schema'
import { CoursesController } from './courses.controller'
import { CoursesRepository } from './courses.repository'
import { CoursesService } from './courses.service'
import { LevelsRepository } from './levels.repository'
import { MissionsRepository } from './missions.repository'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { RolesModule } from 'modules/roles/roles.module'

@Module({
  imports: [MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]), RolesModule],
  controllers: [CoursesController],
  providers: [CoursesService, CoursesRepository, MissionsRepository, LevelsRepository],
  exports: [CoursesService],
})
export class CoursesModule {}
