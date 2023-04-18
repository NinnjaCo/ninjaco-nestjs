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
  // async findCourseMangement(courses: any): Promise<CourseEnrollment[]> {
  //   // get the (enrolledAt, user id, completed) from the User_enroll_course collection and add them to each course object
  //   const courseEnrollmentModel = await this.courseEnrollmentModel.find()
  //   const courseManagement = courses.map((course) => {
  //     const courseManagement = courseEnrollmentModel.find(
  //       (userEnrollCourse) => userEnrollCourse.course_Id.toString() === course._id.toString()
  //     )
  //     course.enrolledAt = courseManagement.enrolledAt
  //     course.userId = courseManagement.userId
  //     course.completed = courseManagement.completed
  //     return course
  //   })
  //   return courseManagement
  // }
}
