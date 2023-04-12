import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { Categorie, CategorieDocument } from './schemas/categorie.schema'
import { Course } from './schemas/course.schema'
import { CoursesRepository } from './courses.repository'
import { CreateCourseDto } from './dto/create-course.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Level, LevelDocument } from './schemas/level.schema'
import { Mission } from './schemas/mission.schema'
import { Model } from 'mongoose'
import { MongoServerError } from 'mongodb'
import { RolesService } from 'modules/roles/roles.service'
import { checkIfValidObjectId, handleMongoDuplicateKeyError } from 'common/shared'

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
    try {
      const course = await this.courseRepository.create(courseDto)
      return course
    } catch (error) {
      // if error type is from mongodb
      if (error instanceof MongoServerError) {
        // This will automatically throw a BadRequestException with the duplicate key error message
        handleMongoDuplicateKeyError(error)
      } else {
        throw new InternalServerErrorException(error)
      }
    }
  }

  /**
   * Find user by id
   * @param courseId
   * @returns Promise<Course> if course is found, otherwise null
   */

  async findCourseById(courseId: string): Promise<Course> {
    // check if courseId is of type ObjectId
    if (!checkIfValidObjectId(courseId)) {
      throw new BadRequestException('Invalid user id')
    }
    return await this.courseRepository.findOne({ _id: courseId })
  }
  /**
   * Update course by id
   * @param courseId
   * @param updateCourseDto
   * @returns Promise<Course> if user is found, otherwise null
   */

  async updateCourse(courseId: string, CreateCourseDto): Promise<Course> {
    try {
      return await this.courseRepository.findOneAndUpdate({ _id: courseId }, CreateCourseDto)
    } catch (error) {
      // if error type is from mongodb
      if (error instanceof MongoServerError) {
        // This will automatically throw a BadRequestException with the duplicate key error message
        handleMongoDuplicateKeyError(error)
      } else {
        throw new InternalServerErrorException(error)
      }
    }
  }
  /**
   * Delete course by id
   * @param courseId
   * @returns Promise<course> if user is found, otherwise null
   */

  async deleteCourse(courseId: string): Promise<Course> {
    return await this.courseRepository.findOneAndDelete({ _id: courseId })
  }

  async findAllMissions(courseId: string): Promise<Mission[]> {
    const course = await this.courseRepository.findOne({ _id: courseId })
    return course.missions
  }
  async findMissionById(courseId: string, missionId: string): Promise<Mission> {
    const course = await this.courseRepository.findOne({ _id: courseId })
    // return the mission with missionId insode the course
    return course.missions.find((mission) => (mission._id as unknown as string) === missionId)
  }
}
