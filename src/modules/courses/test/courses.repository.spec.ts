import { Course } from '../schemas/course.schema'
import { CourseModel } from './support/course.model'
import { CoursesRepository } from '../courses.repository'
import { FilterQuery } from 'mongoose'
import { Level } from '../schemas/level.schema'
import { LevelModel } from './support/level.model'
import { Mission } from '../schemas/mission.schema'
import { MissionModel } from './support/mission.model'
import { Test, TestingModule } from '@nestjs/testing'
import { courseStub } from './stubs/course.stub'
import { getModelToken } from '@nestjs/mongoose'

describe('CoursesRepository', () => {
  let repository: CoursesRepository
  let courseModel: CourseModel
  let missionModel: MissionModel
  let levelModel: LevelModel
  let courseFilterQuery: FilterQuery<Course>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesRepository,
        {
          provide: getModelToken(Course.name),
          useClass: CourseModel,
        },
        {
          provide: getModelToken(Mission.name),
          useClass: MissionModel,
        },
        {
          provide: getModelToken(Level.name),
          useClass: LevelModel,
        },
      ],
    }).compile()

    repository = module.get<CoursesRepository>(CoursesRepository)
    courseModel = module.get<CourseModel>(getModelToken(Course.name))
    missionModel = module.get<MissionModel>(getModelToken(Mission.name))
    levelModel = module.get<LevelModel>(getModelToken(Level.name))
    courseFilterQuery = { _id: courseStub()._id }

    jest.clearAllMocks()
  })

  describe('find', () => {
    describe('when findAll is called', () => {
      let courses: Course[]

      beforeEach(async () => {
        jest.spyOn(courseModel, 'find')
        courses = (await repository.find({})) as Course[]
      })

      test('then it should call the courseModel', () => {
        expect(courseModel.find).toHaveBeenCalledWith({})
      })

      test('then it should return a course', () => {
        expect(courses).toEqual([courseStub()])
      })
    })
  })

  describe('findOne', () => {
    describe('when findOne is called', () => {
      let course: Course

      beforeEach(async () => {
        jest.spyOn(courseModel, 'findOne')
        course = (await repository.findOne(courseFilterQuery)) as Course
      })

      test('then it should call the courseModel', () => {
        expect(courseModel.findOne).toHaveBeenCalled()
      })

      test('then it should return a course', () => {
        expect(course).toEqual(courseStub())
      })
    })
  })
})
