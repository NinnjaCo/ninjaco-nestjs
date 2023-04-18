import { CourseEnrollment, CourseEnrollmentDocument } from './schemas/courseEnrollment.schema'
import { EntityRepository } from 'database/entity.repository'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'

@Injectable()
export class CourseEnrollmentsRepository extends EntityRepository<CourseEnrollmentDocument> {
  constructor(
    @InjectModel(CourseEnrollment.name)
    private readonly courseEnrollmentModel: Model<CourseEnrollmentDocument>
  ) {
    super(courseEnrollmentModel)
  }
}
