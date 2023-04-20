import { Course } from 'modules/courses/schemas/course.schema'
import { CourseEnrollment } from './schemas/courseEnrollment.schema'
import { CourseEnrollmentsRepository } from './courseEnrollments.repository'
import { CoursesService } from 'modules/courses/courses.service'
import { CreateCourseManagementDto } from './dto/create-courseManagement.dto'
import { Injectable } from '@nestjs/common'
import { Level } from 'modules/courses/schemas/level.schema'
import { LevelManagement } from './schemas/LevelManagement.schema'
import { Mission } from 'modules/courses/schemas/mission.schema'
import { MissionManagement } from './schemas/MissionManagement.schema'
import { UpdateCourseMangementDto } from './dto/update-courseManagement'
import { UpdateLevelManagementDto } from './dto/update-levelManagement.dto'
import { UpdateMissionManagementDto } from './dto/update-misionManagement.dto'
import { UsersService } from 'modules/users/users.service'

@Injectable()
export class CourseEnrollmentsService {
  constructor(
    private readonly courseEnrollmentRepository: CourseEnrollmentsRepository,
    private readonly coursesService: CoursesService,
    private readonly userService: UsersService
  ) {}

  async findAllCourses(userId: string): Promise<(Course | CourseEnrollment)[]> {
    //return the all the courses using the findAll function in the course Service
    const courses = await this.coursesService.findAll()
    const result = courses.map((course) => {
      const courseEnrollment = this.courseEnrollmentRepository.findOne({
        course: course._id,
        userId,
      })
      console.log(userId)
      console.log(course._id)
      if (courseEnrollment) {
        console.log(courseEnrollment)
        return courseEnrollment
      }
      return course
    }) as any
    return result
  }

  async findCourseById(id: string, userId: string): Promise<CourseEnrollment> {
    return this.courseEnrollmentRepository.findOne({ _id: id })
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
    // create a new object and add to it the enrolledAt date using the new Date() function
    const courseEnrollmentObjct = {
      ...courseEnrollment,
      enrolledAt: new Date().toISOString(),
    }

    return this.courseEnrollmentRepository.create(courseEnrollmentObjct)
  }

  async deleteCourse(id: string): Promise<CourseEnrollment> {
    return this.courseEnrollmentRepository.findOneAndDelete({ _id: id })
  }

  // mission service
  // find all missions
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

  async createMissionProgress(
    courseEnrollementId: string,
    misssionId: string
  ): Promise<MissionManagement> {
    const mission = await this.courseEnrollmentRepository.createMissionProgress(
      courseEnrollementId,
      misssionId
    )
    return mission
  }

  async findMissionById(missionId: string, courseId: string): Promise<MissionManagement> {
    // get the courseEnrollment object by courseId
    const courseEnrollment = await this.courseEnrollmentRepository.findOne({
      courseId,
    })
    // get the missions array from the courseEnrollment object
    const missions = courseEnrollment.missions
    // return the missions array
    return missions.find((mission) => mission._id.toString() === missionId)
  }

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

  async findLevelById(
    userId: string,
    courseId: string,
    missionId: string,
    levelId: string
  ): Promise<LevelManagement> {
    // get the courseEnrollment object by courseId
    const courseEnrollment = await this.courseEnrollmentRepository.findOne({
      courseId,
      userId,
    })
    // get the missions array from the courseEnrollment object
    const missions = courseEnrollment.missions
    // get the mission object by missionId
    const mission = missions.find((mission) => mission._id.toString() === missionId)
    // get the levels array from the mission object
    const levels = mission.levels
    // return the level object by levelId
    return levels.find((level) => level._id.toString() === levelId)
  }

  async createLevelProgress(
    courseEnrollementId: string,
    missionEnrollementId: string,
    levelEnrollementId: string
  ): Promise<LevelManagement> {
    const level = await this.courseEnrollmentRepository.createLevelProgress(
      courseEnrollementId,
      missionEnrollementId,
      levelEnrollementId
    )
    return level
  }

  // the update function change the state comleted of a level to true, then checks all the levels
  // if all completed, it set the completed state of missions to true, and checks for all the missions
  // if all completed, then it marks the course as completed
  async updateProgress(
    courseEnrolementId: string,
    missionEnrollementId: string,
    levelEnrollementId: string,
    levelManagmentDto: UpdateMissionManagementDto,
    _MissionManagmentDto: UpdateLevelManagementDto,
    CourseManagmntDto: UpdateCourseMangementDto
  ): Promise<LevelManagement | MissionManagement | CourseEnrollment> {
    //update the level and checks if all other levels are completed
    const progress = await this.courseEnrollmentRepository.updateProgress(
      courseEnrolementId,
      missionEnrollementId,
      levelEnrollementId,
      levelManagmentDto,
      _MissionManagmentDto,
      CourseManagmntDto
    )
    return progress
  }
}
