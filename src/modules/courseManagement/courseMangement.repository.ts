import { EntityRepository } from 'database/entity.repository'
import { Injectable } from '@nestjs/common'
import { User_enroll_courseDocument } from './schemas/User_enroll_course.schema'

@Injectable()
export class CourseManagementRepository extends EntityRepository<User_enroll_courseDocument> {}
