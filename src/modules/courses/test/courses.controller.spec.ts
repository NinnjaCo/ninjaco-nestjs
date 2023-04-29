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
  describe('findCourseById', () => {
    describe('when findCourseById is called', () => {
      let course: Course
      let courseId: string

      beforeEach(async () => {
        course = await controller.findOne(courseId)
      })

      test('should call coursesService.findCourseById', () => {
        expect(coursesService.findCourseById).toBeCalled()
      })

      test('should return a course', () => {
        expect(course).toEqual(courseStub())
      })
    })
  })

  describe('createCourse', () => {
    describe('when createCourse is called', () => {
      let course: Course
      let createCourseDto: CreateCourseDto

      beforeEach(async () => {
        course = await controller.create(createCourseDto)
      })

      test('should call coursesService.createCourse', () => {
        expect(coursesService.createCourse).toBeCalled()
      })

      test('should return a course', () => {
        expect(course).toEqual(courseStub())
      })
    })
  })

  describe('deleteCourse', () => {
    describe('when deleteCourse is called', () => {
      let course: Course
      let courseId: string

      beforeEach(async () => {
        course = await controller.remove(courseId)
      })

      test('should call coursesService.deleteCourse', () => {
        expect(coursesService.deleteCourse).toBeCalled()
      })

      test('should return a course', () => {
        expect(course).toEqual(courseStub())
      })
    })
  })

  describe('updateCourse', () => {
    describe('when updateCourse is called', () => {
      let course: Course
      let courseId: string
      let createCourseDto: CreateCourseDto

      beforeEach(async () => {
        course = await controller.update(courseId, createCourseDto)
      })

      test('should call coursesService.updateCourse', () => {
        expect(coursesService.updateCourse).toBeCalled()
      })

      test('should return a course', () => {
        expect(course).toEqual(courseStub())
      })
    })
  })
})
