import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { Course } from 'modules/courses/schemas/course.schema'
import { CourseEnrollment } from './schemas/courseEnrollment.schema'
import { CourseEnrollmentsRepository } from './courseEnrollments.repository'
import { CoursesService } from 'modules/courses/courses.service'
import { CreateCourseManagementDto } from './dto/create-courseManagement.dto'
import { CreateLevelManagementDto } from './dto/create-levelManagagement.dto'
import { CreateMissionManagementDto } from './dto/create-missionManagement.dto'
import { Level } from 'modules/courses/schemas/level.schema'
import { LevelManagement } from './schemas/LevelManagement.schema'
import { Mission } from 'modules/courses/schemas/mission.schema'
import { MissionManagement } from './schemas/MissionManagement.schema'
import { MongoServerError } from 'mongodb'
import { ObjectId } from 'mongoose'
import { UpdateCourseMangementDto } from './dto/update-courseManagement'
import { UpdateLevelManagementDto } from './dto/update-levelManagement.dto'
import { UpdateMissionManagementDto } from './dto/update-misionManagement.dto'
import { UsersLevelsProgressService } from 'modules/usersLevelsProgress/usersLevelsProgress.service'
import { UsersService } from 'modules/users/users.service'
import { handleMongoDuplicateKeyError } from 'common/shared'

@Injectable()
export class CourseEnrollmentsService {
  constructor(
    private readonly courseEnrollmentRepository: CourseEnrollmentsRepository,
    private readonly coursesService: CoursesService,
    private readonly userService: UsersService,
    private readonly usersLevelsProgressService: UsersLevelsProgressService
  ) {}

  /**
   *
   * @param userId
   * @returns return all the courses the user is enrolled in and all the courses the user is not enrolled in
   */
  async findAllCourses(userId: string): Promise<(Course | CourseEnrollment)[]> {
    // get all the courses using the findAll function in the course Service
    const courses = await this.coursesService.findAll()

    const result: (Course | CourseEnrollment)[] = []

    for (const course of courses) {
      const courseObjectId = course._id

      const courseEnrollment = await this.courseEnrollmentRepository.findOne({
        course: courseObjectId,
        user: userId,
      })

      if (courseEnrollment) {
        result.push(courseEnrollment)
      } else {
        result.push(course)
      }
    }

    return result
  }

  /**
   *
   * @param courseId
   * @param userId
   * @returns the courseEnrollment object if the user is enrolled in the course or the course object if the user is not enrolled in the course
   * @throws BadRequestException if the course or user id is invalid
   */
  async findCourseById(courseId: string, userId: string): Promise<CourseEnrollment | Course> {
    // get the course with courseId from the course service
    const course = await this.coursesService.findCourseById(courseId)
    // get the user with userId from the user service
    const user = await this.userService.findOne(userId)

    if (!course || !user) {
      throw new BadRequestException('Invalid course or user id')
    }

    const courseObjectId = course._id
    const userObjectId = user._id
    const courseEnrollment = await this.courseEnrollmentRepository.findOne({
      course: courseObjectId,
      user: userObjectId,
    })

    if (courseEnrollment) {
      return courseEnrollment
    }

    return course
  }

  /**
   *
   * @param courseMnagementDto
   * @returns the course enrollement object when a user enroll in a course
   * @throws BadRequestException if the course or user id is invalid
   */
  async createCourseEnrollement(
    userId: string,
    courseMnagementDto: CreateCourseManagementDto
  ): Promise<CourseEnrollment> {
    // get the user Object and the course
    const user = await this.userService.findOne(userId)
    const course = await this.coursesService.findCourseById(courseMnagementDto.courseId)

    if (!user || !course) {
      throw new BadRequestException('Invalid course or user id')
    }

    // create a new object and add to it the enrolledAt date using the new Date() function
    const courseEnrollmentObject = {
      user: user,
      course: course,
      enrolledAt: new Date().toISOString(),
    }

    try {
      return await this.courseEnrollmentRepository.create(courseEnrollmentObject)
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
   *
   * @param coursid
   * @param userId
   * @returns the deleted courseEnrollment object
   * @description delete the courseEnrollment object when a user unenroll from a course
   * @description delete all level progress associated with the courseId, userId
   * @throws BadRequestException if the course or user id is invalid
   */
  async deleteCourse(courseId: string, userId: string): Promise<CourseEnrollment> {
    try {
      const deletedCourseEnrollmnet = await this.courseEnrollmentRepository.findOneAndDelete({
        course: courseId,
        user: userId,
      })

      // delete all the level progress associated with the courseId, userId
      await this.usersLevelsProgressService.deleteAllLevelsProgress(courseId, userId)

      return deletedCourseEnrollmnet
    } catch (error) {
      throw new BadRequestException('Invalid course or user id')
    }
  }

  /**
   *
   * @param userId
   * @param courseId
   * @returns find all the missions the user is enrolled in and all the missions the user is not enrolled in
   */
  async findAllMissions(
    userId: string,
    courseId: string
  ): Promise<(MissionManagement | Mission)[]> {
    const actuallMissions = await this.coursesService.findAllMissions(courseId)

    const courseEnrollment = await this.courseEnrollmentRepository.findOne({
      user: userId,
      course: courseId,
    })

    if (!courseEnrollment) {
      // if the user is not enrolled in the course return all the missions so they can see the missions
      return actuallMissions
    }

    const result: (MissionManagement | Mission)[] = []

    for (const mission of actuallMissions) {
      const missionObjectId = mission._id

      const missionEnrollment = courseEnrollment.missions.find(
        (mission: any) => mission.mission.toString() === missionObjectId.toString()
      )

      if (missionEnrollment) {
        missionEnrollment.mission = mission
        result.push(missionEnrollment)
      } else {
        result.push(mission)
      }
    }

    return result
  }

  /**
   *
   * @param createMissionProgress
   * @returns the missionProgress object
   */
  async createMissionProgress(
    userId: string,
    courseId: string,
    createMissionProgress: CreateMissionManagementDto
  ): Promise<MissionManagement> {
    const mission = await this.coursesService.findMissionById(
      courseId,
      createMissionProgress.missionId
    )

    if (!mission) {
      throw new BadRequestException('Invalid mission or course id')
    }

    return await this.courseEnrollmentRepository.createMissionProgress(userId, courseId, mission)
  }

  /**
   *
   * @param missionId
   * @param courseId
   * @param userId
   * @returns the mission object according to the missionId
   */
  async findMissionById(
    missionId: string,
    courseId: string,
    userId: string
  ): Promise<MissionManagement | Mission> {
    // get the courseEnrollment object by courseId
    // Dont use the findCourseById function because it will return the course object if the user is not enrolled in the course
    const courseEnrollment = await this.courseEnrollmentRepository.findOne({
      course: courseId,
      user: userId,
    })

    if (!courseEnrollment) {
      throw new BadRequestException('Invalid course or user id')
    }

    const actualMission = courseEnrollment.course.missions.find(
      (actualMission: Mission) => actualMission._id.toString() === missionId
    )

    const mission = courseEnrollment.missions.find(
      (mission) => mission.mission._id.toString() === missionId
    )

    if (!mission) {
      if (!actualMission) {
        throw new BadRequestException('Invalid mission id')
      }
      // if the user is not enrolled in the mission return the normal mission object
      return actualMission
    }

    const actualMissions: Mission = courseEnrollment.course.missions.find(
      (actualMission: Mission) =>
        actualMission._id.toString() == (mission.mission as unknown as string)
    )

    // Mutate the mission object to add the actual mission object to it  (we cannot do populate)
    return {
      ...mission,
      mission: actualMissions,
    }
  }

  /**
   *
   * @param courseId
   * @param userId
   * @param missionId
   * @returns all the levels the user is enrolled in and all the levels the user is not enrolled in
   */
  async findAllLevels(
    courseId: string,
    userId: string,
    missionId: string
  ): Promise<(Level | LevelManagement)[]> {
    // do the same concept as the findAllCourses function
    const actualLevels = await this.coursesService.findAllLevels(courseId, missionId)

    if (!actualLevels) {
      throw new BadRequestException('Invalid course or user or mission id')
    }

    const courseEnrollment = await this.courseEnrollmentRepository.findOne({
      user: userId,
      course: courseId,
    })

    const result: (Level | LevelManagement)[] = []

    for (const level of actualLevels) {
      const levelObjectId = level._id

      const levelEnrollment = courseEnrollment.missions
        ?.find((mission: any) => mission.mission.toString() === missionId)
        ?.levels.find((level: any) => level.level.toString() === levelObjectId.toString())

      if (levelEnrollment) {
        levelEnrollment.level = level
        result.push(levelEnrollment)
      } else {
        result.push(level)
      }
    }

    return result
  }

  /**
   *
   * @param userId
   * @param courseId
   * @param missionId
   * @param levelId
   * @returns the level object according to the levelId
   */
  async findLevelById(
    userId: string,
    courseId: string,
    missionId: string,
    levelId: string
  ): Promise<LevelManagement> {
    // find one courseEnrollment object by courseId
    const courseEnrollment = await this.findCourseById(courseId, userId)
    // get the missions array from the courseEnrollment object
    const missions = courseEnrollment.missions

    // get the levels array from the mission object

    const mission = missions.map((mission) => {
      if (mission.mission.toString() === missionId) {
        return mission
      }
    })

    const levels = mission[0].levels

    // return the level object by levelId
    return levels.find((level) => level.level.toString() === levelId)
  }

  /**
   *
   * @param createLevelProgress
   * @returns the levelProgress object
   */
  async createLevelProgress(
    userId: string,
    courseId: string,
    missionId: string,
    createLevelProgress: CreateLevelManagementDto
  ): Promise<LevelManagement> {
    const level = await this.coursesService.findLevelById(
      courseId,
      missionId,
      createLevelProgress.levelId
    )

    if (!level) {
      throw new BadRequestException('Invalid level or course id')
    }

    const levelProgress = await this.usersLevelsProgressService.createLevelProgress({
      userId,
      courseId,
      missionId,
      levelId: createLevelProgress.levelId,
      progress: '',
    })

    return await this.courseEnrollmentRepository.createLevelProgress(
      userId,
      courseId,
      missionId,
      createLevelProgress,
      levelProgress,
      level
    )
  }

  /**
   *
   * @param levelManagmentDto
   * @param missionManagementDto
   * @param courseManagementDto
   * @returns the updated courseEnrollment object if the level is completed, the mission is completed, and the course is completed
   */
  // the update function change the state comleted of a level to true, then checks all the levels
  // if all completed, it set the completed state of missions to true, and checks for all the missions
  // if all completed, then it marks the course as completed
  async updateLevel(
    userId: string,
    courseId: string,
    missionId: string,
    levelId: string,
    updateLevelProgress: UpdateLevelManagementDto
  ): Promise<CourseEnrollment> {
    //update the level and checks if all other levels are completed
    const progress = await this.courseEnrollmentRepository.updateLevel(
      userId,
      courseId,
      missionId,
      levelId,
      updateLevelProgress
    )
    return progress
  }
}
