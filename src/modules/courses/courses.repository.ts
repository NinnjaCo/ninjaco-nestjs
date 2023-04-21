import { Course, CourseDocument } from './schemas/course.schema'
import { CreateLevelDto } from './dto/create-level.dto'
import { CreateMissionDto } from './dto/create-mission.dto'
import { EntityRepository } from '../../database/entity.repository'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { UpdateMissionDto } from './dto/update-mission.dto'

import { Level } from './schemas/level.schema'
import { Mission } from './schemas/mission.schema'

import { Model } from 'mongoose'
import { UpdateLevelDto } from './dto/update-level.dto'

@Injectable()
export class CoursesRepository extends EntityRepository<CourseDocument> {
  constructor(
    @InjectModel(Course.name) private readonly courseModel: Model<CourseDocument>,
    @InjectModel(Mission.name) private readonly missionModel: Model<Mission>,
    @InjectModel(Level.name) private readonly levelModel: Model<Level>
  ) {
    super(courseModel)
  }

  /**
   *
   * @param courseId
   * @param missionDto
   * @returns Promise<Mission>
   */
  async createMission(courseId: string, missionDto: CreateMissionDto): Promise<Mission> {
    const mission = new this.missionModel(missionDto)
    mission.createdAt = new Date().toISOString()
    mission.updatedAt = new Date().toISOString()

    const course = await this.courseModel.findOne({ _id: courseId })
    course.missions.push(mission)
    await course.save()
    return mission
  }

  /**
   *
   * @param courseId
   * @returns Promise<Mission[]>
   */
  async findAllMissions(courseId: string): Promise<Mission[]> {
    //find the course having courseId
    const course = await this.courseModel.find({ _id: courseId })
    //return the missions array of the course
    return course[0].missions
  }

  /**
   *
   * @param courseId
   * @param missionId
   * @returns Promise<Mission>
   */

  async findOneMission(courseId: string, missionId: string): Promise<Mission> {
    //find the course having courseId
    const course = await this.courseModel.find({ _id: courseId })
    //return the mission with missionId inside the courde
    return course[0].missions.find((mission) => mission._id.toString() === missionId)
  }

  /**
   *
   * @param courseId
   * @param missionId
   * @param missionDto
   * @returns Promise<Mission>
   */

  async findOneMisionAndUpdate(
    courseId: string,
    missionId: string,
    missionDto: UpdateMissionDto
  ): Promise<Mission> {
    const cleanMissionDto = Object.keys(missionDto).reduce((acc, key) => {
      if (missionDto[key] !== undefined) {
        acc[key] = missionDto[key]
      }
      return acc
    }, {})

    const course = await this.courseModel.findOne({ _id: courseId })
    course.missions = course.missions.map((mission) => {
      if (mission._id.toString() === missionId) {
        mission = {
          ...mission,
          ...cleanMissionDto,
          createdAt: mission.createdAt,
          updatedAt: new Date().toISOString(),
        }
      }
      return mission
    }) as unknown as [Mission]
    await course.save()
    return course?.missions.find((mission) => mission._id.toString() === missionId)
  }

  //delete a mission inside a course
  /**
   *
   * @param courseId
   * @param missionId
   * @returns Promise<Mission>
   */
  async findOneMissionAndDelete(courseId: string, missionId: string): Promise<Mission> {
    const course = await this.courseModel.findOne({ _id: courseId })
    const deletedMission = course?.missions.find((mission) => mission._id.toString() === missionId)
    course.missions = (await course.missions.filter(
      (mission) => mission._id.toString() !== missionId
    )) as unknown as [Mission]
    //save the deleted mission in a variable to return it
    await course.save()
    return deletedMission
  }

  //find all levels in a mission inside a course
  /**
   *
   * @param courseId
   * @param missionId
   * @returns Promise<Level[]>
   */
  async findAllLevels(courseId: string, missionId: string): Promise<Level[]> {
    //find the course having courseId
    const course = await this.courseModel.find({ _id: courseId })
    // find the missions inside the course having the mission id
    const mission = course[0].missions.find((mission) => mission._id.toString() === missionId)
    //return the levels array of the mission
    return mission.levels
  }

  //create level
  /**
   *
   * @param courseId
   * @param missionId
   * @param levelDto
   * @returns Promise<Level>
   */
  async createLevel(courseId: string, missionId: string, levelDto: CreateLevelDto): Promise<Level> {
    const level = new this.levelModel(levelDto)
    level.createdAt = new Date().toISOString()
    level.updatedAt = new Date().toISOString()

    // find the mission using findoneMission function
    const updatedMission = await this.findOneMission(courseId, missionId)
    //push the level to the levels array of the mission
    updatedMission.levels.push(level)

    // get the course and replace the mission with the updated mission
    const course = await this.courseModel.findOne({ _id: courseId })

    //save the level inside the mission
    course.missions = course.missions.map((mission) => {
      if (mission._id.toString() === missionId) {
        return updatedMission
      }
      return mission
    }) as unknown as [Mission]
    await course.save()

    //return the level

    return level
  }

  //find a level by id
  /**
   *
   * @param courseId \
   * @param missionId
   * @param levelId
   * @returns Promise<Level>
   */
  async findOneLevel(courseId: string, missionId: string, levelId: string): Promise<Level> {
    // find the mission using findoneMission function
    const mission = await this.findOneMission(courseId, missionId)
    //return the level with levelId inside the mission
    return mission.levels.find((level) => level._id.toString() === levelId)
  }

  //update a level
  /**
   *
   * @param id
   * @param missionId
   * @param levelId
   * @param levelDto
   * @returns  Promise<Level>
   */
  async findOneLevelAndUpdate(
    id: string,
    missionId: string,
    levelId: string,
    levelDto: UpdateLevelDto
  ): Promise<Level> {
    // find the mission using findoneMission function
    const updatedMission = await this.findOneMission(id, missionId)

    const clearLevelDto = Object.keys(levelDto).reduce((acc, key) => {
      if (levelDto[key] !== undefined) {
        acc[key] = levelDto[key]
      }
      return acc
    }, {})

    //update the level with levelId inside the mission
    updatedMission.levels = updatedMission.levels.map((level) => {
      if (level._id.toString() === levelId) {
        return {
          ...level,
          ...clearLevelDto,
          createdAt: level.createdAt,
          updatedAt: new Date().toISOString(),
        }
      }
      return level
    }) as unknown as [Level]

    const course = await this.courseModel.findOne({ _id: id })

    course.missions = course.missions.map((mission) => {
      if (mission._id.toString() === missionId) {
        return updatedMission
      }
      return mission
    }) as unknown as [Mission]
    await course.save()

    return updatedMission.levels.find((level) => level._id.toString() === levelId)
  }

  //delete a level inside a mission inside a course
  /**
   *
   * @param id
   * @param missionId
   * @param levelId
   * @returns Promise<Level>
   */
  async findOneLevelAndDelete(id: string, missionId: string, levelId: string): Promise<Level> {
    // find the mission using findoneMission function
    const updatedMission = await this.findOneMission(id, missionId)
    // get the level with levelId inside the mission
    const deletedLevel = updatedMission.levels.find((level) => level._id.toString() === levelId)
    //delete the level with levelId inside the mission
    updatedMission.levels = updatedMission.levels.filter(
      (level) => level._id.toString() !== levelId
    ) as unknown as [Level]
    const course = await this.courseModel.findOne({ _id: id })

    course.missions = course.missions.map((mission) => {
      if (mission._id.toString() === missionId) {
        return updatedMission
      }
      return mission
    }) as unknown as [Mission]
    await course.save()

    // return the eleted level
    return deletedLevel
  }
}
