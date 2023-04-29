import { Course } from '../../courses/schemas/course.schema'
import { CourseEnrollment } from '../schemas/courseEnrollment.schema'
import { CourseEnrollmentsController } from '../courseEnrollments.controller'
import { CourseEnrollmentsService } from '../courseEnrollments.service'
import { CreateCourseManagementDto } from '../dto/create-courseManagement.dto'
import { CreateMissionManagementDto } from '../dto/create-missionManagement.dto'
import { Mission } from '../../courses/schemas/mission.schema'
import { MissionManagement } from '../schemas/MissionManagement.schema'
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

  describe('deleteCourse', () => {
    describe('when deleteCourse is called', () => {
      let course: CourseEnrollment
      let courseId: string
      let userId: string

      beforeEach(async () => {
        const { _id } = courseEnrollmentStub()
        courseId = _id.toString()
        userId = 'userId'
        course = await controller.remove(courseId, userId)
      })

      test('should call courseEnrollmentsService.deleteCourse', () => {
        expect(courseEnrollmentsService.deleteCourse).toBeCalled()
      })

      test('should return a course', () => {
        expect(course).toEqual(courseEnrollmentStub())
      })
    })
  })

  describe('createCourseEnrollment', () => {
    describe('when createCourse is called', () => {
      let course: CourseEnrollment
      let createCourseDto: CreateCourseManagementDto
      let userId: string

      beforeEach(async () => {
        const { _id } = courseEnrollmentStub()
        userId = 'userId'
        createCourseDto = {
          courseId: _id.toString(),
        }
        course = await controller.create(userId, createCourseDto)
      })

      test('should call courseEnrollmentsService.createCourse', () => {
        expect(courseEnrollmentsService.createCourseEnrollement).toBeCalled()
      })

      test('should return a course', () => {
        expect(course).toEqual(courseEnrollmentStub())
      })
    })
  })

  describe('createMissionProgress', () => {
    describe('when createMissionProgress is called', () => {
      let mission: MissionManagement
      let createMissionDto: CreateMissionManagementDto
      let userId: string
      let courseId: string

      beforeEach(async () => {
        const { _id } = courseEnrollmentStub()
        userId = 'userId'
        createMissionDto = {
          missionId: _id.toString(),
        }
        mission = await controller.createMissionProgress(courseId, userId, createMissionDto)
      })

      test('should call courseEnrollmentsService.createMissionProgress', () => {
        expect(courseEnrollmentsService.createMissionProgress).toBeCalled()
      })

      test('should return a mission', () => {
        expect(mission).toEqual(courseEnrollmentStub())
      })
    })
  })

  describe('findMissionById', () => {
    describe('when findMissionById is called', () => {
      let mission: MissionManagement | Mission
      let missionId: string
      let userId: string
      let courseId: string

      beforeEach(async () => {
        const { _id } = courseEnrollmentStub()
        missionId = _id.toString()
        userId = 'userId'
        mission = await controller.findMissionById(courseId, missionId, userId)
      })

      test('should call courseEnrollmentsService.findMissionById', () => {
        expect(courseEnrollmentsService.findMissionById).toBeCalled()
      })

      test('should return a mission', () => {
        expect(mission).toEqual(courseEnrollmentStub())
      })
    })
  })
})
