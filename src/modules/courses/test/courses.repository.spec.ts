import { Course } from '../schemas/course.schema'
import { CourseModel } from './support/course.model'
import { CoursesRepository } from '../courses.repository'
import { FilterQuery } from 'mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { courseStub } from './stubs/course.stub'
import { getModelToken } from '@nestjs/mongoose'

describe('CoursesRepository', () => {
  let repository: CoursesRepository
  let courseModel: CourseModel
  let courseFilterQuery: FilterQuery<Course>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesRepository,
        {
          provide: getModelToken(Course.name),
          useClass: CourseModel,
        },
      ],
    }).compile()

    repository = module.get<CoursesRepository>(CoursesRepository)
    courseModel = module.get<CourseModel>(getModelToken(Course.name))
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
        expect(courseModel.findOne).toHaveBeenCalledWith(courseFilterQuery)
      })

      test('then it should return a course', () => {
        expect(course).toEqual(courseStub())
      })
    })
  })
})
