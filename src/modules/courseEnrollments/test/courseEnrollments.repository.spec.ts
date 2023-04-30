import { CourseEnrollment } from '../schemas/courseEnrollment.schema'
import { CourseEnrollmentModel } from './support/courseEnrollment.model'
import { CourseEnrollmentsRepository } from '../courseEnrollments.repository'
import { FilterQuery } from 'mongoose'
import { MissionEnrollmentModel } from './support/missionEnrollment.model'
import { MissionManagement } from '../schemas/MissionManagement.schema'
import { Test, TestingModule } from '@nestjs/testing'
import { courseEnrollmentStub } from './stubs/courseEnrollment.stub'
import { getModelToken } from '@nestjs/mongoose'

describe('CourseEnrollmentsRepository', () => {
  let repository: CourseEnrollmentsRepository

  describe('Find Operations', () => {
    let courseEnrollmentModel: CourseEnrollmentModel
    let courseEnrollmentFilterQuery: FilterQuery<CourseEnrollment>
    let missionEnrollmentModel: MissionEnrollmentModel

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          CourseEnrollmentsRepository,

          {
            provide: getModelToken(CourseEnrollment.name),
            useClass: CourseEnrollmentModel,
          },
          {
            provide: getModelToken(MissionManagement.name),
            useClass: MissionEnrollmentModel,
          },
        ],
      }).compile()

      repository = module.get<CourseEnrollmentsRepository>(CourseEnrollmentsRepository)
      courseEnrollmentModel = module.get<CourseEnrollmentModel>(
        getModelToken(CourseEnrollment.name)
      )
      missionEnrollmentModel = module.get<MissionEnrollmentModel>(
        getModelToken(MissionManagement.name)
      )
      courseEnrollmentFilterQuery = { _id: courseEnrollmentStub()._id }

      jest.clearAllMocks()
    })

    describe('createMissionProgress', () => {
      describe('when createMissionProgress is called', () => {
        let courseEnrollment: CourseEnrollment

        beforeEach(async () => {
          jest.spyOn(courseEnrollmentModel, 'create')
          courseEnrollment = (await courseEnrollmentModel.create()) as unknown as CourseEnrollment
        })

        test('then it should call the courseEnrollmentModel', () => {
          expect(courseEnrollmentModel.create).toHaveBeenCalledWith(courseEnrollmentStub())
        })

        test('then it should return a user', () => {
          expect(courseEnrollment).toEqual(courseEnrollmentStub())
        })
      })
    })
  })
})
