import { Course } from 'modules/courses/schemas/course.schema'
import { CourseEnrollment } from './schemas/courseEnrollment.schema'
import { CourseEnrollmentsRepository } from './courseEnrollments.repository'
import { CoursesService } from 'modules/courses/courses.service'
import { CreateCourseManagementDto } from './dto/create-courseManagement.dto'
import { Injectable } from '@nestjs/common'
import { MissionManagement } from './schemas/MissionManagement.schema'
import { UsersService } from 'modules/users/users.service'

@Injectable()
export class CourseEnrollmentsService {
  constructor(
    private readonly courseEnrollmentRepository: CourseEnrollmentsRepository,
    private readonly coursesService: CoursesService,
    private readonly userService: UsersService
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

  async findCourseById(id: string, userId: string): Promise<CourseEnrollment> {
    return this.courseEnrollmentRepository.findOne({ _id: id, userId })
  }
  async createCourseEnrollement(courseMnagementDto: CreateCourseManagementDto, courseId: string) {
    // user from the courseManagmentDto
    const { userId, ...newDto } = courseMnagementDto
    // get the user Object and the course
    const user = await this.userService.findOne(userId)
    const course = await this.coursesService.findCourseById(courseId)

    const courseEnrollment = {
      newDto,
      user,
      course,
    }

    return this.courseEnrollmentRepository.create(courseEnrollment)
  }

  async deleteCourse(id: string): Promise<CourseEnrollment> {
    return this.courseEnrollmentRepository.findOneAndDelete({ _id: id })
  }

  // mission service
  // find all missions
  async findAllMissions(userId: string, courseId: string): Promise<MissionManagement[]> {
    // get the courseEnrollment object by xourseId
    const courseEnrollment = await this.courseEnrollmentRepository.findOne({
      courseId,
      userId,
    })
    // get the missions array from the courseEnrollment object
    const missions = courseEnrollment.missions
    // return the missions array
    return missions
  }
}
