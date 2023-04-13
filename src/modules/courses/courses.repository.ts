import { Course, CourseDocument } from './schemas/course.schema'
import { CreateMissionDto } from './dto/create-mission.dto'
import { EntityRepository } from 'database/entity.repository'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { Mission, MissionSchema } from './schemas/mission.schema'
import mongoose, { Model } from 'mongoose'

@Injectable()
export class CoursesRepository extends EntityRepository<CourseDocument> {
  constructor(
    @InjectModel(Course.name) private readonly CourseModel: Model<CourseDocument>,
    @InjectModel(Mission.name) private readonly MissionModel: Model<Mission>
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
    mission.levels = missionDto.levels

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
}
