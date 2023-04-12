import { Categorie, CategorieDocument } from './schemas/categorie.schema'
import { Course } from './schemas/course.schema'
import { CoursesRepository } from './courses.repository'
import { CreateCourseDto } from './dto/create-course.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { Level, LevelDocument } from './schemas/level.schema'
import { Mission } from './schemas/mission.schema'
import { Model } from 'mongoose'
import { RolesService } from 'modules/roles/roles.service'

@Injectable()
export class CoursesService {
  constructor(
    private readonly courseRepository: CoursesRepository,
    private readonly roleService: RolesService
  ) {}

  async findAll(): Promise<Course[]> {
    return await this.courseRepository.find({})
  }

  async createCourse(courseDto: CreateCourseDto): Promise<Course> {
    const course = await this.courseRepository.create(courseDto)
    return course
  }

  async findCourseById(courseId: string): Promise<Course> {
    return await this.courseRepository.findOne({ _id: courseId })
  }

  async updateCourse(courseId: string, CreateCourseDto): Promise<Course> {
    return await this.courseRepository.findOneAndUpdate({ _id: courseId }, CreateCourseDto)
  }

  async deleteCourse(courseId: string): Promise<Course> {
    return await this.courseRepository.findOneAndDelete({ _id: courseId })
  }

  async findAllMissions(courseId: string): Promise<Mission[]> {
    const course = await this.courseRepository.findOne({ _id: courseId })
    return course.missions
  }
  async findMissionById(courseId: string, missionId: string): Promise<Mission> {
    const course = await this.courseRepository.findOne({ _id: courseId })
    // return the mission with missionId insode the course
    return course.missions.find((mission) => (mission._id as unknown as string) === missionId)
  }
}
