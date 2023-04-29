import { Course } from '../schemas/course.schema'
import { CoursesController } from '../courses.controller'
import { CoursesService } from '../courses.service'
import { CreateCourseDto } from '../dto/create-course.dto'
import { Test, TestingModule } from '@nestjs/testing'
import { courseStub } from './stubs/course.stub'

jest.mock('../courses.service')

describe('CoursesController', () => {
  let controller: CoursesController
  let coursesService: CoursesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoursesController],
      providers: [CoursesService],
    }).compile()

    controller = module.get<CoursesController>(CoursesController)
    coursesService = module.get<CoursesService>(CoursesService)
    jest.clearAllMocks()
  })

  test('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('findAllCourses', () => {
    describe('when findAllCourses is called', () => {
      let courses: Course[]

      beforeEach(async () => {
        courses = await controller.findAll()
      })

      test('should call coursesService.findAllCourses', () => {
        expect(coursesService.findAll).toBeCalled()
      })

      test('should return an array of courses', () => {
        expect(courses).toEqual([courseStub()])
      })
    })
  })
})
