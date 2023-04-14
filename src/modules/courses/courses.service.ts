import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { Course } from './schemas/course.schema'
import { CoursesRepository } from './courses.repository'
import { CreateCourseDto } from './dto/create-course.dto'
import { CreateLevelDto } from './dto/create-level.dto'
import { CreateMissionDto } from './dto/create-mission.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Level, LevelDocument } from './schemas/level.schema'
import { Mission } from './schemas/mission.schema'
import { Model } from 'mongoose'
import { MongoServerError } from 'mongodb'
import { RolesService } from 'modules/roles/roles.service'
import { UpdateMissionDto } from './dto/update-mission.dto'
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

  /**
   * Find all missions in a specifique course by id
   * @param courseId
   * @returns Promise <Missions[]> if missions are found, otherwise empty array
   */

  async findAllMissions(courseId: string): Promise<Mission[]> {
    if (!checkIfValidObjectId(courseId)) {
      throw new BadRequestException('Invalid course id')
    }
    const missions = await this.courseRepository.findAllMissions(courseId)
    return missions
  }

  /**
   * Find a specific mission in a specifique course by id
   * @param courseId
   * @param missionId
   * @returns Promise <Mission> if mission is found, otherwise null
   */
  async findMissionById(courseId: string, missionId: string): Promise<Mission> {
    try {
      const missions = await this.courseRepository.findOneMission(courseId, missionId)
      return missions
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

  async updateMission(courseId: string, missionId: string, updateMissionDto): Promise<Mission> {
    try {
      const mission = await this.courseRepository.findOneMisionAndUpdate(
        courseId,
        missionId,
        updateMissionDto
      )
      // find the index of the mission with missionId
      return mission
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

  async deleteMission(courseId: string, missionId: string): Promise<Mission> {
    try {
      const mission = await this.courseRepository.findOneMissionAndDelete(courseId, missionId)
      return mission
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

  async createMission(courseId: string, createMissionDto: CreateMissionDto): Promise<Mission> {
    const mission = await this.courseRepository.createMission(courseId, createMissionDto)
    return mission
  }

  //levels:

  async findAllLevels(id: string, missionId: string): Promise<Level[]> {
    if (!checkIfValidObjectId(id)) {
      throw new BadRequestException('Invalid course id')
    }
    const levels = await this.courseRepository.findAllLevels(id, missionId)
    return levels
  }

  //create level
  async createLevel(id: string, missionId: string, LevelDto: CreateLevelDto): Promise<Level> {
    const level = await this.courseRepository.createLevel(id, missionId, LevelDto)
    return level
  }

  //find level by id
  async findLevelById(id: string, missionId: string, levelId: string): Promise<Level> {
    try {
      const level = await this.courseRepository.findOneLevel(id, missionId, levelId)
      return level
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

  //update level by id
  async updateLevel(
    id: string,
    missionId: string,
    levelId: string,
    LevelDto: CreateLevelDto
  ): Promise<Level> {
    try {
      const level = await this.courseRepository.findOneLevelAndUpdate(
        id,
        missionId,
        levelId,
        LevelDto
      )
      return level
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
}
