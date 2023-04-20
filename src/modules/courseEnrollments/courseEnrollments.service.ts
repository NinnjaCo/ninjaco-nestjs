import { Course } from 'modules/courses/schemas/course.schema'
import { CourseEnrollment } from './schemas/courseEnrollment.schema'
import { CourseEnrollmentsRepository } from './courseEnrollments.repository'
import { CoursesService } from 'modules/courses/courses.service'
import { CreateCourseManagementDto } from './dto/create-courseManagement.dto'
import { CreateLevelManagementDto } from './dto/create-levelManagagement.dto'
import { CreateMissionManagementDto } from './dto/create-missionManagement.dto'
import { Injectable } from '@nestjs/common'
import { Level } from 'modules/courses/schemas/level.schema'
import { LevelManagement } from './schemas/LevelManagement.schema'
import { Mission } from 'modules/courses/schemas/mission.schema'
import { MissionManagement } from './schemas/MissionManagement.schema'
import { ObjectId } from 'mongoose'
import { UpdateCourseMangementDto } from './dto/update-courseManagement'
import { UpdateLevelManagementDto } from './dto/update-levelManagement.dto'
import { UpdateMissionManagementDto } from './dto/update-misionManagement.dto'
import { UsersService } from 'modules/users/users.service'
import { waitForDebugger } from 'inspector'

@Injectable()
export class CourseEnrollmentsService {
  constructor(
    private readonly courseEnrollmentRepository: CourseEnrollmentsRepository,
    private readonly coursesService: CoursesService,
    private readonly userService: UsersService
  ) {}

  /**
   *
   * @param userId
   * @returns return all the courses the user is enrolled in and all the courses the user is not enrolled in
   */
  async findAllCourses(userId: string): Promise<(Course | CourseEnrollment)[]> {
    //return the all the courses using the findAll function in the course Service
    const courses = await this.coursesService.findAll()
    //create an empty array to store the result
    let result = []
    result = courses.map(async (course) => {
      //get the course id as a string
      const courseId = course._id.toString()
      const courseEnrollment = await this.findCourseById(courseId, userId)
      // wait for the course to be fetched from the database

      if (courseEnrollment) {
        result.push(courseEnrollment)
        console.log(result)
        return result
      } else {
        result.push(course)
        return result
      }
    }) as unknown as (Course | CourseEnrollment)[]
    return result
  }

  /**
   *
   * @param courseId
   * @param userId
   * @returns the courseEnrollment object if the user is enrolled in the course or the course object if the user is not enrolled in the course
   */
  async findCourseById(courseId: string, userId: string): Promise<CourseEnrollment | Course> {
    // get the course with courseId from the course service
    const course = await this.coursesService.findCourseById(courseId)
    // get the user with userId from the user service

    const user = await this.userService.findOne(userId)
    const courseObjectId = course._id
    const userObjectId = user._id

    return this.courseEnrollmentRepository.findOne({ course: courseObjectId, user: userObjectId })
  }

  /**
   *
   * @param courseMnagementDto
   * @returns the course enrollement object when a user enrol in a course
   */
  async createCourseEnrollement(courseMnagementDto: CreateCourseManagementDto) {
    // user from the courseManagmentDto
    const { userId, ...newDto } = courseMnagementDto
    // get the user Object and the course
    const user = await this.userService.findOne(userId)
    const course = await this.coursesService.findCourseById(courseMnagementDto.courseId)

    const courseEnrollment = {
      newDto,
      user,
      course,
    }
    // create a new object and add to it the enrolledAt date using the new Date() function
    const courseEnrollmentObjct = {
      ...courseEnrollment,
      enrolledAt: new Date().toISOString(),
    }

    return this.courseEnrollmentRepository.create(courseEnrollmentObjct)
  }

  /**
   *
   * @param coursid
   * @returns the deleted courseEnrollment object
   */

  async deleteCourse(id: string): Promise<CourseEnrollment> {
    return this.courseEnrollmentRepository.findOneAndDelete({ _id: id })
  }

  // mission service
  //find all missions

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
    // do the same concept as the findAllCourses function
    const missions = await this.coursesService.findAllMissions(courseId)
    const result = missions.map((mission) => {
      const MissionManagement = this.courseEnrollmentRepository.findOne({
        courseId,
        userId,
        'missions.missionId': mission._id,
      })
      if (MissionManagement) {
        return MissionManagement
      }
      return mission
    }) as unknown as (MissionManagement | Mission)[]
    return result
  }
  /**
   *
   * @param createMissionProgress
   * @returns the missionProgress object
   */
  async createMissionProgress(
    createMissionProgress: CreateMissionManagementDto
  ): Promise<MissionManagement> {
    const mission = await this.coursesService.findMissionById(
      createMissionProgress.courseId,
      createMissionProgress.missionId
    )
    return await this.courseEnrollmentRepository.createMissionProgress(
      createMissionProgress,
      mission
    )
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
  ): Promise<MissionManagement> {
    // get the courseEnrollment object by courseId
    const courseEnrollment = await this.findCourseById(courseId, userId)
    // get the missions array from the courseEnrollment object
    const missions = courseEnrollment.missions

    //loop over the missions array and get the mission object by missionId
    const mission = missions.map((mission) => {
      if (mission.mission.toString() === missionId) {
        return mission
      }
    })
    return mission[0]
  }

  /**
   *
   * @param courseId
   * @param userId
   * @param missionId
   * @returns all the levels the user is enrolled in and all the levels the user is not enrolled in
   */

  async findAllLevels(courseId, userId, missionId): Promise<(Level | LevelManagement)[]> {
    // do the same concept as the findAllCourses function
    const levels = await this.coursesService.findAllLevels(courseId, missionId)
    const result = levels.map((level) => {
      const LevelManagement = this.courseEnrollmentRepository.findOne({
        courseId,
        userId,
        'missions.missionId': missionId,
        'missions.levels.levelId': level._id,
      })
      if (LevelManagement) {
        return LevelManagement
      }
      return level
    }) as unknown as (LevelManagement | Level)[]
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

  async createLevelProgress(
    createLevelProgress: CreateLevelManagementDto
  ): Promise<LevelManagement> {
    const level = await this.coursesService.findLevelById(
      createLevelProgress.courseId,
      createLevelProgress.missionId,
      createLevelProgress.levelId
    )
    return await this.courseEnrollmentRepository.createLevelProgress(createLevelProgress, level)
  }

  // the update function change the state comleted of a level to true, then checks all the levels
  // if all completed, it set the completed state of missions to true, and checks for all the missions
  // if all completed, then it marks the course as completed
  async updateProgress(
    levelManagmentDto: UpdateLevelManagementDto,
    missionManagementDto: UpdateMissionManagementDto,
    courseManagementDto: UpdateCourseMangementDto
  ): Promise<CourseEnrollment> {
    //update the level and checks if all other levels are completed
    const progress = await this.courseEnrollmentRepository.updateProgress(
      levelManagmentDto,
      missionManagementDto,
      courseManagementDto
    )
    return progress
  }
}
