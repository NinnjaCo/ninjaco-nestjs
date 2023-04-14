import { Course, CourseDocument } from './schemas/course.schema'
import { CreateMissionDto } from './dto/create-mission.dto'
import { EntityRepository } from 'database/entity.repository'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { Mission } from './schemas/mission.schema'
import { Model } from 'mongoose'
import { UpdateMissionDto } from './dto/update-mission.dto'

@Injectable()
export class CoursesRepository extends EntityRepository<CourseDocument> {
  constructor(
    @InjectModel(Course.name) private readonly CourseModel: Model<CourseDocument>,
    @InjectModel(Mission.name) private readonly MissionModel: Model<Mission>
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
    const course = await this.CourseModel.findOne({ _id: courseId })
    const deletedMission = course?.missions.find((mission) => mission._id.toString() === missionId)
    course.missions = (await course.missions.filter(
      (mission) => mission._id.toString() !== missionId
    )) as unknown as [Mission]
    //save the deleted mission in a variable to return it
    await course.save()
    return deletedMission
  }
}
