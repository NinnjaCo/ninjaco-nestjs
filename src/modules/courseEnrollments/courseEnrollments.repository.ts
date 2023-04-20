import { CourseEnrollment, CourseEnrollmentDocument } from './schemas/courseEnrollment.schema'
import { CreateLevelManagementDto } from './dto/create-levelManagagement.dto'
import { CreateMissionManagementDto } from './dto/create-missionManagement.dto'
import { EntityRepository } from 'database/entity.repository'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { Level } from 'modules/courses/schemas/level.schema'
import { LevelManagement } from './schemas/LevelManagement.schema'
import { Mission } from 'modules/courses/schemas/mission.schema'
import { MissionManagement } from './schemas/MissionManagement.schema'
import { Model } from 'mongoose'
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

  async createMissionProgress(
    createMissionProgress: CreateMissionManagementDto,
    mission: Mission
  ): Promise<MissionManagement> {
    // create a new mission management
    const missionObjct = {
      mission: mission,
      startedAt: new Date().toISOString(),
    }
    const missionManagement = new this.missionManagementModel({
      ...missionObjct,
    })

    // find the course enrollment
    const courseEnrollment = await this.courseEnrollmentModel.findOne({
      course: createMissionProgress.courseId,
      user: createMissionProgress.userId,
    })

    console.log(courseEnrollment)
    console.log(missionManagement)
    // push the mission management to the missions array of the course enrollment
    courseEnrollment.missions.push(missionManagement)
    // save the course enrollment
    await courseEnrollment.save()
    // return the mission management
    return missionManagement
  }

  async createLevelProgress(
    createLevelProgress: CreateLevelManagementDto,
    level: Level
  ): Promise<LevelManagement> {
    // create a new level management
    const levelObjct = {
      level: level,
      startedAt: new Date().toISOString(),
    }
    const levelManagement = new this.levelManagementModel({
      ...levelObjct,
    })
    // find the course enrollment
    const courseEnrollment = await this.courseEnrollmentModel.findOne({
      course: createLevelProgress.courseId,
      user: createLevelProgress.userId,
    })
    // find the mission management inside the course enrollment
    const missionManagement = courseEnrollment.missions.find(
      (mission) => mission.mission.toString() === createLevelProgress.missionId
    )
    missionManagement.levels.push(levelManagement)
    console.log(missionManagement)
    courseEnrollment.missions = courseEnrollment.missions.map(async (mission) => {
      if (mission.mission.toString() === createLevelProgress.missionId) {
        // delete the old mission management, and save the new one that contains the new level
        courseEnrollment.missions = (await courseEnrollment.missions.filter(
          (mission) => mission.mission.toString() !== createLevelProgress.missionId
        )) as unknown as [MissionManagement]

        courseEnrollment.missions.push(missionManagement)
        return missionManagement
      }
      return mission
    }) as unknown as [MissionManagement]

    await courseEnrollment.save()
    // return the level management
    return levelManagement
  }

  async updateProgress(
    levelManagmentDto: UpdateLevelManagementDto,
    missionManagementDto: UpdateMissionManagementDto,
    courseManagementDto: UpdateCourseMangementDto
  ): Promise<CourseEnrollment> {
    // find the course enrollment
    const courseEnrollment = await this.courseEnrollmentModel.findOne({
      course: levelManagmentDto.courseId,
      user: levelManagmentDto.userId,
    })
    // find the mission management inside the course enrollment
    const missionManagement = courseEnrollment.missions.find(
      (mission) => mission.mission.toString() === levelManagmentDto.missionId
    )
    // find the level management inside the mission management
    const levelManagement = missionManagement.levels.find(
      (level) => level.level.toString() === levelManagmentDto.levelId
    )
    // update the level management
    levelManagement.completed = levelManagmentDto.completed

    //********** */
    //delete the old mission and add the updated one

    courseEnrollment.missions = courseEnrollment.missions.map(async (mission) => {
      if (mission.mission.toString() === levelManagmentDto.missionId) {
        // delete the old mission management, and save the new one that contains the new level
        courseEnrollment.missions = (await courseEnrollment.missions.filter(
          (mission) => mission.mission.toString() !== levelManagmentDto.missionId
        )) as unknown as [MissionManagement]

        courseEnrollment.missions.push(missionManagement)
        return missionManagement
      }
      return mission
    }) as unknown as [MissionManagement]

    //************************** */

    // loop through the levels, if all completed, set the mission as completed, if not return the updated level
    const completedLevels = missionManagement.levels.filter((level) => level.completed === true)
    if (completedLevels.length === missionManagement.levels.length) {
      missionManagement.completed = true
    } else {
      await courseEnrollment.save()
      return courseEnrollment
    }

    //loop through the missions, if all completed, set the course as completed, if not return the updated mission
    const completedMissions = courseEnrollment.missions.filter(
      (mission) => mission.completed === true
    )
    if (completedMissions.length === courseEnrollment.missions.length) {
      console.log('course completed')
      courseEnrollment.completed = true
    } else {
      await courseEnrollment.save()
      return courseEnrollment
    }

    // save the course enrollment
    return await courseEnrollment.save()
  }
}
