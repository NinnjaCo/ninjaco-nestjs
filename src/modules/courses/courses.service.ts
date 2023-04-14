import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { Course } from './schemas/course.schema'
import { CoursesRepository } from './courses.repository'
import { CreateCourseDto } from './dto/create-course.dto'
import { CreateLevelDto } from './dto/create-level.dto'
import { CreateMissionDto } from './dto/create-mission.dto'
import { Level } from './schemas/level.schema'
import { Mission } from './schemas/mission.schema'
import { MongoServerError } from 'mongodb'
import { checkIfValidObjectId, handleMongoDuplicateKeyError } from 'common/shared'

@Injectable()
export class CoursesService {
  constructor(private readonly courseRepository: CoursesRepository) {}

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

  /**
   * Update a specific mission in a specifique course by id
   * @param courseId
   * @param missionId
   * @param updateMissionDto
   * @returns Promise <Mission> if mission is found, otherwise null
   */
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

  /**
   * Delete a specific mission in a specifique course by id
   * @param courseId
   * @param missionId
   * @returns Promise <Mission> if mission is found, otherwise null
   */
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

  /**
   * Create a new mission in a specifique course by id
   * @param courseId
   * @param createMissionDto
   * @returns Promise <Mission> if mission is found, otherwise null
   */
  async createMission(courseId: string, createMissionDto: CreateMissionDto): Promise<Mission> {
    const mission = await this.courseRepository.createMission(courseId, createMissionDto)
    return mission
  }

  /**
   * Find all levels in a specifique course by id
   * @param courseId
   * @param missionId
   * @returns Promise <Levels[]> if levels are found, otherwise empty array
   */
  async findAllLevels(courseId: string, missionId: string): Promise<Level[]> {
    if (!checkIfValidObjectId(courseId)) {
      throw new BadRequestException('Invalid course id')
    }
    const levels = await this.courseRepository.findAllLevels(courseId, missionId)
    return levels
  }

  /**
   * Create a new level in a specifique course by id
   * @param courseId
   * @param missionId
   * @param createLevelDto
   * @returns Promise <Level> if level is found, otherwise null
   */
  async createLevel(courseId: string, missionId: string, LevelDto: CreateLevelDto): Promise<Level> {
    const level = await this.courseRepository.createLevel(courseId, missionId, LevelDto)
    return level
  }

  /**
   * Find a specific level in a specifique course by id
   * @param courseId
   * @param missionId
   * @param levelId
   * @returns Promise <Level> if level is found, otherwise null
   */
  async findLevelById(courseId: string, missionId: string, levelId: string): Promise<Level> {
    try {
      const level = await this.courseRepository.findOneLevel(courseId, missionId, levelId)
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

  /**
   * Update a specific level in a specifique course by id
   * @param courseId
   * @param missionId
   * @param levelId
   * @param updateLevelDto
   * @returns Promise <Level> if level is found, otherwise null
   */
  async updateLevel(
    courseId: string,
    missionId: string,
    levelId: string,
    LevelDto: CreateLevelDto
  ): Promise<Level> {
    try {
      const level = await this.courseRepository.findOneLevelAndUpdate(
        courseId,
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

  /**
   * Delete a specific level in a specifique course by id
   * @param courseId
   * @param missionId
   * @param levelId
   * @returns Promise <Level> if level is found, otherwise null
   */
  async deleteLevel(id: string, missionId: string, levelId: string): Promise<Level> {
    try {
      const level = await this.courseRepository.findOneLevelAndDelete(id, missionId, levelId)
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
