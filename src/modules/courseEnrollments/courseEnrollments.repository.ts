import { CourseEnrollment, CourseEnrollmentDocument } from './schemas/courseEnrollment.schema'
import { EntityRepository } from 'database/entity.repository'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { LevelManagement } from './schemas/LevelManagement.schema'
import { MissionManagement } from './schemas/MissionManagement.schema'
import { Model } from 'mongoose'

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
    courseEnrollmentId: string,
    missionId: string
  ): Promise<MissionManagement> {
    // create a new mission management
    const missionObjct = {
      missionId,
      startedAt: new Date().toISOString(),
    }
    const missionManagement = new this.missionManagementModel({
      ...missionObjct,
    })

    // find the course enrollment
    const courseEnrollment = await this.courseEnrollmentModel.findOne({
      _id: courseEnrollmentId,
    })
    console.log(courseEnrollmentId)
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
    courseEnrollmentId: string,
    missionEnrollmentId: string,
    levelEnrollmentId: string
  ): Promise<LevelManagement> {
    // create a new level management
    const levelObjct = {
      levelEnrollmentId,
      startedAt: new Date().toISOString(),
    }
    const levelManagement = new this.levelManagementModel({
      ...levelObjct,
    })
    // find the course enrollment
    const courseEnrollment = await this.courseEnrollmentModel.findOne({
      _id: courseEnrollmentId,
    })
    // find the mission management inside the course enrollment
    const missionManagement = courseEnrollment.missions.find(
      (mission) => mission._id.toString() === missionEnrollmentId
    )
    missionManagement.levels.push(levelManagement)

    courseEnrollment.missions = courseEnrollment.missions.map((mission) => {
      if (mission._id.toString() === missionEnrollmentId) {
        console.log('hello', missionManagement)
        return missionManagement
      }
      return mission
    }) as unknown as [MissionManagement]

    await courseEnrollment.save()
    // return the level management
    return levelManagement
  }
}
