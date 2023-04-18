import { CourseManagementRepository } from './courseMangement.repository'
import { CoursesService } from 'modules/courses/courses.service'
import { Injectable } from '@nestjs/common'
import { User_enroll_course } from './schemas/User_enroll_course.schema'

@Injectable()
export class CourseManagementService {
  constructor(
    private readonly courseManagementRepository: CourseManagementRepository,
    private readonly coursesService: CoursesService
  ) {}

  async findAll(): Promise<User_enroll_course[]> {
    //return the all the courses using the findAll function in the course Service
    const courses = await this.coursesService.findAll()
    return await this.courseManagementRepository.findCourseMangement(courses)
  }
}
