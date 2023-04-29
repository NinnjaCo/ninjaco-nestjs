import { Course } from '../schemas/course.schema'
import { CoursesController } from '../courses.controller'
import { CoursesService } from '../courses.service'
import { CreateCourseDto } from '../dto/create-course.dto'
import { CreateMissionDto } from '../dto/create-mission.dto'
import { Mission } from '../schemas/mission.schema'
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

  describe('findAllMissions', () => {
    describe('when findAllMissions is called', () => {
      let missions: Mission[]
      let courseId: string

      beforeEach(async () => {
        missions = await controller.findAllMissions(courseId)
      })

      test('should call coursesService.findAllMissions', () => {
        expect(coursesService.findAllMissions).toBeCalled()
      })

      test('should return an array of courses', () => {
        expect(missions).toEqual([courseStub()])
      })
    })
  })
  describe('findMissionById', () => {
    describe('when findMissionById is called', () => {
      let mission: Mission
      let courseId: string
      let missionId: string

      beforeEach(async () => {
        mission = await controller.findOneMission(courseId, missionId)
      })

      test('should call coursesService.findMissionById', () => {
        expect(coursesService.findMissionById).toBeCalled()
      })

      test('should return a course', () => {
        expect(mission).toEqual(courseStub())
      })
    })
  })

  describe('createMission', () => {
    describe('when createMission is called', () => {
      let mission: Mission
      let courseId: string
      let createMissionDto: CreateMissionDto

      beforeEach(async () => {
        mission = await controller.createMission(courseId, createMissionDto)
      })

      test('should call coursesService.createMission', () => {
        expect(coursesService.createMission).toBeCalled()
      })

      test('should return a course', () => {
        expect(mission).toEqual(courseStub())
      })
    })
  })
})
