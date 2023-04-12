import { Course, CourseDocument } from './schemas/course.schema'
import { EntityRepository } from 'database/entity.repository'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'

@Injectable()
export class CoursesRepository extends EntityRepository<CourseDocument> {
  constructor(@InjectModel(Course.name) private readonly CourseModel: Model<CourseDocument>) {
    super(CourseModel)
  }
}
