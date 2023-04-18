import { Course } from 'modules/courses/schemas/course.schema'
import { CourseEnrollment } from './schemas/courseEnrollment.schema'
import { CourseEnrollmentsRepository } from './courseEnrollments.repository'
import { CoursesService } from 'modules/courses/courses.service'
import { CreateCourseManagementDto } from './dto/create-courseManagement.dto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CourseEnrollmentsService {
  constructor(
    private readonly courseEnrollmentRepository: CourseEnrollmentsRepository,
    private readonly coursesService: CoursesService
  ) {}

  async findAllCourses(userId: string): Promise<Course[] | CourseEnrollment[]> {
    //return the all the courses using the findAll function in the course Service
    const courses = await this.coursesService.findAll()
    console.log(courses)
    const result = courses.map((course) => {
      const CourseEnrollment = this.courseEnrollmentRepository.findOne({
        courseId: course._id,
        userId,
      })
      if (CourseEnrollment) {
        return CourseEnrollment
      }
      return course
    }) as unknown as Course[] | CourseEnrollment[]
    return result
  }
  async createCourseEnrollement(courseMnagementDto: CreateCourseManagementDto) {
    return this.courseEnrollmentRepository.create(courseMnagementDto)
  }

  async deleteCourse(id: string): Promise<CourseEnrollment> {
    return this.courseEnrollmentRepository.findOneAndDelete({ _id: id })
  }
}
