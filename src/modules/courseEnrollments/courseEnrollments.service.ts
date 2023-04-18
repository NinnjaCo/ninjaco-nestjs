import { CourseEnrollment } from './schemas/courseEnrollment.schema'
import { CourseManagementRepository } from './courseMangement.repository'
import { CoursesService } from 'modules/courses/courses.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CourseEnrollmentsService {
  constructor(
    private readonly courseManagementRepository: CourseManagementRepository,
    private readonly coursesService: CoursesService
  ) {}

  async findAll(): Promise<CourseEnrollment[]> {
    //return the all the courses using the findAll function in the course Service
    const courses = await this.coursesService.findAll()
    return await this.courseManagementRepository.findCourseMangement(courses)
  }
}
