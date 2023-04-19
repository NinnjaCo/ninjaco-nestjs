import { CourseEnrollment, CourseEnrollmentDocument } from './schemas/courseEnrollment.schema'
import { CreateLevelManagementDto } from './dto/create-levelManagement.dto'
import { CreateMissionManagementDto } from './dto/create-missionManagement.dto'
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
    missionId: string,
    createMissionManagementDto: CreateMissionManagementDto
  ): Promise<MissionManagement> {
    // create a new mission management
    const missionObjct = {
      createMissionManagementDto,
      missionId,
    }
    const missionManagement = new this.missionManagementModel({
      ...missionObjct,
    })
    // find the course enrollment
    const courseEnrollment = await this.courseEnrollmentModel.findOne({
      _id: courseEnrollmentId,
    })
    // push the mission management to the missions array of the course enrollment
    courseEnrollment.missions.push(missionManagement)
    // save the course enrollment
    await courseEnrollment.save()
    // return the mission management
    return missionManagement
  }

  async createLevelProgress(
    courseEnrollmentId: string,
    missionId: string,
    levelId: string,
    createLevelManagementDto: CreateLevelManagementDto
  ): Promise<LevelManagement> {
    // create a new level management
    const levelObjct = {
      createLevelManagementDto,
      levelId,
    }
    const levelManagement = new this.levelManagementModel({
      ...levelObjct,
    })
    // find the course enrollment
    const courseEnrollment = await this.courseEnrollmentModel.findOne({
      _id: courseEnrollmentId,
    })
    // find the mission management
    const missionManagement = await this.missionManagementModel.findOne({
      _id: missionId,
    })

    // push the level management to the levels array of the course enrollmen
    missionManagement.levels.push(levelManagement)

    await courseEnrollment.save()
    // return the level management
    return levelManagement
  }
}
