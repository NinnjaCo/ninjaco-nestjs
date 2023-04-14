import { Course, CourseDocument } from './schemas/course.schema'
import { CreateLevelDto } from './dto/create-level.dto'
import { CreateMissionDto } from './dto/create-mission.dto'
import { EntityRepository } from 'database/entity.repository'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { UpdateMissionDto } from './dto/update-mission.dto'

import { Level } from './schemas/level.schema'
import { Mission, MissionSchema } from './schemas/mission.schema'

import { Model } from 'mongoose'

@Injectable()
export class CoursesRepository extends EntityRepository<CourseDocument> {
  constructor(
    @InjectModel(Course.name) private readonly CourseModel: Model<CourseDocument>,
    @InjectModel(Mission.name) private readonly MissionModel: Model<Mission>,
    @InjectModel(Level.name) private readonly LevelModel: Model<Level>
  ) {
    super(CourseModel)
  }

  //createmission function and add an _id, createdAt , updatedAt fields
  async createMission(courseId: string, missionDto: CreateMissionDto): Promise<Mission> {
    const mission = new this.MissionModel(missionDto)

    const course = await this.CourseModel.findOne({ _id: courseId })
    course.missions.push(mission)
    await course.save()
    return mission
  }

  //find all misisons in a course
  async findAllMissions(courseId: string): Promise<Mission[]> {
    //find the course having courseId
    const course = await this.CourseModel.find({ _id: courseId })
    //return the missions array of the course
    return course[0].missions
  }

  //find a mission by id
  async findOneMission(courseId: string, missionId: string): Promise<Mission> {
    //find the course having courseId
    const course = await this.CourseModel.find({ _id: courseId })
    //return the mission with missionId inside the courde
    return course[0].missions.find((mission) => mission._id.toString() === missionId)
  }

  //update a mission
  async findOneMisionAndUpdate(
    courseId: string,
    missionId: string,
    missionDto: UpdateMissionDto
  ): Promise<Mission> {
    const course = await this.CourseModel.findOne({ _id: courseId })
    course.missions = course.missions.map((mission) => {
      if (mission._id.toString() === missionId) {
        return { ...mission, ...missionDto }
      }
      return mission
    }) as unknown as [Mission]
    await course.save()
    return course?.missions.find((mission) => mission._id.toString() === missionId)
  }

  //delete a mission inside a course
  async findOneMissionAndDelete(courseId: string, missionId: string): Promise<Mission> {
    return await this.CourseModel.findOneAndDelete({
      _id: courseId,
      'missions._id': missionId,
    })
  }

  //find all levels in a mission inside a course
  async findAllLevels(courseId: string, missionId: string): Promise<Level[]> {
    //find the course having courseId
    const course = await this.CourseModel.find({ _id: courseId })
    // find the missions inside the course having the mission id
    const mission = course[0].missions.find((mission) => mission._id.toString() === missionId)
    //return the levels array of the mission
    return mission.levels
  }

  //create level
  async createLevel(courseId: string, missionId: string, levelDto: CreateLevelDto): Promise<Level> {
    const level = new this.LevelModel()
    level.levelNumber = levelDto.levelNumber
    level.buldingPartsImages = levelDto.buildingParts
    level.stepGuideImages = levelDto.stepGuideImage

    // find the mission using findoneMission function
    const updatedMission = await this.findOneMission(courseId, missionId)
    //push the level to the levels array of the mission
    updatedMission.levels.push(level)

    // get the course and replace the mission with the updated mission
    const course = await this.CourseModel.findOne({ _id: courseId })

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
  async findOneLevel(courseId: string, missionId: string, levelId: string): Promise<Level> {
    // find the mission using findoneMission function
    const mission = await this.findOneMission(courseId, missionId)
    //return the level with levelId inside the mission
    return mission.levels.find((level) => level._id.toString() === levelId)
  }

  //update a level
  async findOneLevelAndUpdate(
    id: string,
    missionId: string,
    levelId: string,
    LevelDto: CreateLevelDto
  ): Promise<Level> {
    // find the mission using findoneMission function
    const updatedMission = await this.findOneMission(id, missionId)
    //update the level with levelId inside the mission
    updatedMission.levels = updatedMission.levels.map((level) => {
      if (level._id.toString() === levelId) {
        return { ...level, ...LevelDto }
      }
      return level
    }) as unknown as [Level]

    const course = await this.CourseModel.findOne({ _id: id })

    course.missions = course.missions.map((mission) => {
      if (mission._id.toString() === missionId) {
        return updatedMission
      }
      return mission
    }) as unknown as [Mission]
    await course.save()

    return updatedMission.levels.find((level) => level._id.toString() === levelId)
  }
}
