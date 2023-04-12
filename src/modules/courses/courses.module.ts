import { Course, CourseSchema } from './schemas/course.schema'
import { CoursesController } from './courses.controller'
import { CoursesRepository } from './courses.repository'
import { CoursesService } from './courses.service'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { RolesModule } from 'modules/roles/roles.module'

@Module({
  imports: [MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]), RolesModule],
  controllers: [CoursesController],
  providers: [CoursesService, CoursesRepository],
  exports: [CoursesService],
})
export class CoursesModule {}
