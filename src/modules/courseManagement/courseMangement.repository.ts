import { EntityRepository } from 'database/entity.repository'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { User_enroll_course, User_enroll_courseDocument } from './schemas/User_enroll_course.schema'

@Injectable()
export class CourseManagementRepository extends EntityRepository<User_enroll_courseDocument> {
  constructor(
    @InjectModel(User_enroll_course.name)
    private readonly userEnrollCourseModel: Model<User_enroll_courseDocument>
  ) {
    super(userEnrollCourseModel)
  }

  async findCourseMangement(courses: any): Promise<User_enroll_course[]> {
    // get the (enrolledAt, user id, completed) from the User_enroll_course collection and add them to each course object
    const userEnrollCourse = await this.userEnrollCourseModel.find()
    const courseManagement = courses.map((course) => {
      const courseManagement = userEnrollCourse.find(
        (userEnrollCourse) => userEnrollCourse.courseId.toString() === course._id.toString()
      )
      course.enrolledAt = courseManagement.enrolledAt
      course.userId = courseManagement.userId
      course.completed = courseManagement.completed
      return course
    })
    return courseManagement
  }
}
