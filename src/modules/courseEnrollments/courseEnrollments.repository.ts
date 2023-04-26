import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { CourseEnrollment, CourseEnrollmentDocument } from './schemas/courseEnrollment.schema'
import { CreateLevelManagementDto } from './dto/create-levelManagagement.dto'
import { CreateMissionManagementDto } from './dto/create-missionManagement.dto'
import { Document, FilterQuery, Model, Types } from 'mongoose'
import { EntityRepository } from 'database/entity.repository'
import { InjectModel } from '@nestjs/mongoose'
import { Level } from 'modules/courses/schemas/level.schema'
import { LevelManagement } from './schemas/LevelManagement.schema'
import { LevelProgress } from 'modules/usersLevelsProgress/schema/LevelProgress.schema'
import { Mission } from 'modules/courses/schemas/mission.schema'
import { MissionManagement } from './schemas/MissionManagement.schema'
import { UpdateCourseMangementDto } from './dto/update-courseManagement'
import { UpdateLevelManagementDto } from './dto/update-levelManagement.dto'
import { UpdateMissionManagementDto } from './dto/update-misionManagement.dto'

@Injectable()
export class CourseEnrollmentsRepository extends EntityRepository<CourseEnrollmentDocument> {
  constructor(
    @InjectModel(CourseEnrollment.name)
    private readonly courseEnrollmentModel: Model<CourseEnrollmentDocument>,
    // inject the model of the cMissionManagement schema
    @InjectModel(MissionManagement.name)
    private readonly missionManagementModel: Model<MissionManagement>,
    @InjectModel(LevelManagement.name)
    private readonly levelManagementModel: Model<LevelManagement>
  ) {
    super(courseEnrollmentModel)
  }

  /**
   * find one course enrollement by query  and populate the user and course
   * @param entityFilterQuery
   * @param projection
   * @returns Promise<CourseEnrollmentDocument>
   */
  async findOne(
    entityFilterQuery: FilterQuery<CourseEnrollmentDocument>,
    projection?: Record<string, unknown>
  ): Promise<CourseEnrollmentDocument> {
    // populate the user and course
    // remove the password, verifyEmailToken, hashedRt, resetPasswordToken
    return await this.courseEnrollmentModel
      .findOne(entityFilterQuery, projection)
      .populate('user', '-password -verifyEmailToken -hashedRt -resetPasswordToken')
      .populate('course')
  }

  /**
   * create mission progress
   * @param createMissionProgress
   * @param mission
   * @returns Promise<MissionManagement>
   * @throws InternalServerErrorException
   */
  async createMissionProgress(
    userId: string,
    courseId: string,
    mission: Mission
  ): Promise<MissionManagement> {
    const missionManagement = new this.missionManagementModel({
      mission: mission,
      startedAt: new Date().toISOString(),
    })

    if (!missionManagement) {
      throw new InternalServerErrorException('Unable to create mission management')
    }

    // find the course enrollment
    const courseEnrollment = await this.findOne({
      course: courseId,
      user: userId,
    })

    // if a mission with the same id exists do not add it
    if (
      courseEnrollment.missions.find(
        (mission) => mission.mission.toString() === missionManagement.mission.toString()
      )
    ) {
      throw new BadRequestException('Mission already exists')
    }

    courseEnrollment.missions.push(missionManagement)

    await courseEnrollment.save()

    return missionManagement
  }

  /**
   *
   * @param createLevelProgress
   * @param level
   * @returns Promise<LevelManagement>
   */
  async createLevelProgress(
    userId: string,
    courseId: string,
    missionId: string,
    createLevelProgress: CreateLevelManagementDto,
    levelProgress: LevelProgress,
    level: Level
  ): Promise<LevelManagement> {
    const levelManagement = new this.levelManagementModel({
      level: level,
      levelProgress: levelProgress,
      startedAt: new Date().toISOString(),
    })

    if (!levelManagement) {
      throw new InternalServerErrorException('Unable to create level management')
    }

    // find the course enrollment
    const courseEnrollment = await this.findOne({
      course: courseId,
      user: userId,
    })

    const missionToUpdate = courseEnrollment.missions.find(
      (mission) => mission.mission.toString() === missionId
    )

    // if a level with the same id exists do not add it
    if (
      missionToUpdate.levels.find(
        (level) => level.level.toString() === levelManagement.level.toString()
      )
    ) {
      throw new BadRequestException('Level already exists')
    }

    missionToUpdate.levels.push(levelManagement)

    courseEnrollment.missions = courseEnrollment.missions.map((mission) => {
      if (mission.mission.toString() === missionId) {
        // delete the old mission management, and save the new one that contains the new level
        courseEnrollment.missions = courseEnrollment.missions.filter(
          (mission) => mission.mission.toString() !== missionId
        ) as unknown as [MissionManagement]

        courseEnrollment.missions.push(missionToUpdate)
        return missionToUpdate
      }
      return mission
    }) as unknown as [MissionManagement]

    await courseEnrollment.save()

    return levelManagement
  }

  /**
   *
   * @param levelManagmentDto
   * @param missionManagementDto
   * @param courseManagementDto
   * @returns  Promise<CourseEnrollment>
   */

  async updateLevel(
    userId: string,
    courseId: string,
    missionId: string,
    levelId: string,
    updateLevelProgress: UpdateLevelManagementDto
  ): Promise<CourseEnrollment> {
    const courseEnrollment = await this.findOne({
      course: courseId,
      user: userId,
    })

    const missionManagement = courseEnrollment.missions.find(
      (mission) => mission.mission.toString() === missionId
    )
    const levelManagement = missionManagement.levels.find(
      (level) => level.level.toString() === levelId
    )

    if (!courseEnrollment || !missionManagement || !levelManagement) {
      throw new InternalServerErrorException('Unable to find the course enrollment')
    }

    levelManagement.completed = updateLevelProgress.completed

    courseEnrollment.missions = courseEnrollment.missions.map((mission) => {
      if (mission.mission.toString() === missionId) {
        // delete the old mission management, and save the new one that contains the new level
        courseEnrollment.missions = courseEnrollment.missions.filter(
          (mission) => mission.mission.toString() !== missionId
        ) as unknown as [MissionManagement]

        courseEnrollment.missions.push(missionManagement)
        return missionManagement
      }
      return mission
    }) as unknown as [MissionManagement]

    const completedLevels = missionManagement.levels.filter((level) => level.completed === true)
    // check if the number of levels inside missionManagment is equal to the number of levels in missions
    if (missionManagement.levels.length === courseEnrollment.course.missions.length) {
      if (
        completedLevels.length === missionManagement.levels.length &&
        missionManagement.levels.length === courseEnrollment.course.missions.length
      ) {
        missionManagement.completed = true

        courseEnrollment.missions = courseEnrollment.missions.map((mission) => {
          if (mission.mission.toString() === missionId) {
            // delete the old mission management, and save the new one that contains the new level
            courseEnrollment.missions = courseEnrollment.missions.filter(
              (mission) => mission.mission.toString() !== missionId
            ) as unknown as [MissionManagement]

            courseEnrollment.missions.push(missionManagement)
            return missionManagement
          }
          return mission
        }) as unknown as [MissionManagement]

        // loop through the missions, if all completed, set the course as completed, if not return the updated mission
        const completedMissions = courseEnrollment.missions.filter(
          (mission) => mission.completed === true
        )
        // check if the number of missions inside courseEnrollment is equal to the number of missions in course
        if (courseEnrollment.missions.length === courseEnrollment.course.missions.length) {
          if (
            completedMissions.length === courseEnrollment.missions.length && // user completed all missions they have started
            courseEnrollment.missions.length === courseEnrollment.course.missions.length // user started all missions
          ) {
            courseEnrollment.completed = true
            await courseEnrollment.save()
            return courseEnrollment
          } else {
            await courseEnrollment.save()
            return courseEnrollment
          }
        }
      } else {
        await courseEnrollment.save()
        return courseEnrollment
      }
    }
  }
}
