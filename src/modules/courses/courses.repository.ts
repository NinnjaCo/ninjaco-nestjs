import { Course, CourseDocument } from './schemas/course.schema'
import { CreateLevelDto } from './dto/create-level.dto'
import { CreateMissionDto } from './dto/create-mission.dto'
import { EntityRepository } from 'database/entity.repository'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { Level } from './schemas/level.schema'
import { Mission, MissionSchema } from './schemas/mission.schema'
import { UpdateMissionDto } from './dto/update-mission.dto'
import mongoose, { Model } from 'mongoose'

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
  async createMiss(courseId: string, missionDto: CreateMissionDto): Promise<Mission> {
    const mission = new this.MissionModel()
    mission.title = missionDto.title
    mission.description = missionDto.description
    mission.image = missionDto.image
    mission.categoryId = missionDto.categoryId
    mission.levels = []

    const course = await this.CourseModel.findOneAndUpdate(
      { _id: courseId },
      { $push: { missions: mission } },
      { new: true }
    )
    return course.missions[course.missions.length - 1]
  }

  //find all misisons in a course
  async findAll(courseId: string): Promise<Mission[]> {
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
    //update the mission
    const course = await this.CourseModel.findOne({ _id: courseId })
    for (let i = 0; i < course.missions.length; i++) {
      if (course.missions[i]._id.toString() === missionId) {
        course.missions[i].title = missionDto.title ?? course.missions[i].title
        course.missions[i].description = missionDto.description ?? course.missions[i].description
        course.missions[i].image = missionDto.image ?? course.missions[i].image
        course.missions[i].categoryId = missionDto.categoryId ?? course.missions[i].categoryId
      }
    }
    const updatetdCourse = await course.save()
    return updatetdCourse.missions.find((mission) => mission._id.toString() === missionId)
  }

  //delete a mission inside a course
  async findOneMissionAndDelete(courseId: string, missionId: string): Promise<Mission> {
    const course = await this.CourseModel.findOneAndRemove(
      { _id: courseId, 'missions._id': missionId },
      { new: true }
    )
    return course.missions.find((mission) => mission._id.toString() === missionId)
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

    //find the mission by using the findOnemissoin function
    const mission = await this.findOneMission(courseId, missionId)
    //push the level to the levels array of the mission
    mission.levels.push(level)
    //save the mission

    //return the last level of the mission
    return mission.levels[mission.levels.length - 1]
  }
}
