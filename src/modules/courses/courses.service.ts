import { Categorie, CategorieDocument } from './schemas/categorie.schema'
import { Course } from './schemas/course.schema'
import { CoursesRepository } from './courses.repository'
import { CreateCourseDto } from './dto/create-course.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { Level, LevelDocument } from './schemas/level.schema'
import { Model } from 'mongoose'
import { RolesService } from 'modules/roles/roles.service'

@Injectable()
export class CoursesService {
  constructor(
    private readonly courseRepository: CoursesRepository,
    private readonly roleService: RolesService
  ) {}
  /**
   * Find all courses
   * @returns Promise <Course[]> if users are found, otherwise empty array
   */

  async findAll(): Promise<Course[]> {
    return await this.courseRepository.find({})
  }
  /**
   * Create new course
   * @param CreateCourseDto
   * @returns Promise<course>
   */

  async createCourse(courseDto: CreateCourseDto): Promise<Course> {
    const course = await this.courseRepository.create(courseDto)
    return course
  }

  /**
   * Find user by id
   * @param courseId
   * @returns Promise<Course> if course is found, otherwise null
   */

  async findCourseById(courseId: string): Promise<Course> {
    return await this.courseRepository.findOne({ _id: courseId })
  }
  /**
   * Update course by id
   * @param courseId
   * @param updateCourseDto
   * @returns Promise<Course> if user is found, otherwise null
   */

  async updateCourse(courseId: string, CreateCourseDto): Promise<Course> {
    return await this.courseRepository.findOneAndUpdate({ _id: courseId }, CreateCourseDto)
  }
  /**
   * Delete course by id
   * @param courseId
   * @returns Promise<course> if user is found, otherwise null
   */

  async deleteCourse(courseId: string): Promise<Course> {
    return await this.courseRepository.findOneAndDelete({ _id: courseId })
  }
}
