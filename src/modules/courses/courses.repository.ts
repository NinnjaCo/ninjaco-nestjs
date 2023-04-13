import { Course, CourseDocument } from './schemas/course.schema'
import { CreateMissionDto } from './dto/create-mission.dto'
import { EntityRepository } from 'database/entity.repository'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { Mission } from './schemas/mission.schema'
import { Model } from 'mongoose'

@Injectable()
export class CoursesRepository extends EntityRepository<CourseDocument> {
  constructor(@InjectModel(Course.name) private readonly CourseModel: Model<CourseDocument>) {
    super(CourseModel)
  }

  //createmission function
  async createMiss(courseId: string, missionDto: CreateMissionDto): Promise<Mission> {
    const course = await this.CourseModel.findOneAndUpdate(
      { _id: courseId },
      { $push: { missions: missionDto } },
      { new: true }
    )
    return course.missions[course.missions.length - 1]
  }
}
