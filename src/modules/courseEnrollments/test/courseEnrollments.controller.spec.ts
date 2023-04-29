import { Course } from '../../courses/schemas/course.schema'
import { CourseEnrollment } from '../schemas/courseEnrollment.schema'
import { CourseEnrollmentsController } from '../courseEnrollments.controller'
import { CourseEnrollmentsService } from '../courseEnrollments.service'
import { CreateCourseManagementDto } from '../dto/create-courseManagement.dto'
import { Test, TestingModule } from '@nestjs/testing'
import { courseEnrollmentStub } from './stubs/courseEnrollment.stub'

jest.mock('../courseEnrollments.service')

describe('CourseEnrollmentsController', () => {
  let controller: CourseEnrollmentsController
  let courseEnrollmentsService: CourseEnrollmentsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseEnrollmentsController],
      providers: [CourseEnrollmentsService],
    }).compile()

    controller = module.get<CourseEnrollmentsController>(CourseEnrollmentsController)
    courseEnrollmentsService = module.get<CourseEnrollmentsService>(CourseEnrollmentsService)
    jest.clearAllMocks()
  })

  test('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('findAllCourses', () => {
    describe('when findAllCourses is called', () => {
      let courses: (Course | CourseEnrollment)[]
      let userId: string

      beforeEach(async () => {
        courses = await controller.findAllCourses(userId)
      })

      test('should call courseEnrollmentsService.findAllCourses', () => {
        expect(courseEnrollmentsService.findAllCourses).toBeCalled()
      })

      test('should return an array of courses', () => {
        expect(courses).toEqual([courseEnrollmentStub()])
      })
    })
  })
  describe('findCourseById', () => {
    describe('when findCourseById is called', () => {
      let course: Course | CourseEnrollment
      let courseId: string
      let userId: string

      beforeEach(async () => {
        const { _id } = courseEnrollmentStub()
        courseId = _id.toString()
        userId = 'userId'
        course = await controller.findOne(courseId, userId)
      })

      test('should call courseEnrollmentsService.findCourseById', () => {
        expect(courseEnrollmentsService.findCourseById).toBeCalled()
      })

      test('should return a course', () => {
        expect(course).toEqual(courseEnrollmentStub())
      })
    })
  })
})
