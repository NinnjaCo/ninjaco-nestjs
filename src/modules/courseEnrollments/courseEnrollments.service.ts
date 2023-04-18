import { Course } from 'modules/courses/schemas/course.schema'
import { CourseEnrollment } from './schemas/courseEnrollment.schema'
import { CourseEnrollmentsRepository } from './courseEnrollments.repository'
import { CoursesService } from 'modules/courses/courses.service'
import { CreateCourseManagementDto } from './dto/create-courseManagement.dto'
import { Injectable } from '@nestjs/common'
import { UsersService } from 'modules/users/users.service'

@Injectable()
export class CourseEnrollmentsService {
  constructor(
    private readonly courseEnrollmentRepository: CourseEnrollmentsRepository,
    private readonly coursesService: CoursesService,
    private readonly usersService: UsersService
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
  async createCourseEnrollement(
    courseMnagementDto: CreateCourseManagementDto,
    userId: string,
    courseId: string
  ) {
    // find the user and course
    const course = await this.coursesService.findCourseById(courseId)
    // find user
    const user = await this.usersService.findOne(userId)
    courseMnagementDto.course = course
    courseMnagementDto.user = user
    return this.courseEnrollmentRepository.create(courseMnagementDto)
  }

  async deleteCourse(id: string): Promise<CourseEnrollment> {
    return this.courseEnrollmentRepository.findOneAndDelete({ _id: id })
  }
}
