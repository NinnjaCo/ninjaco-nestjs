import { courseEnrollmentStub } from '../test/stubs/courseEnrollment.stub'

export const CourseEnrollmentsService = jest.fn().mockReturnValue({
  findAll: jest.fn().mockResolvedValue([courseEnrollmentStub()]),
  createCourseEnrollment: jest.fn().mockResolvedValue(courseEnrollmentStub()),
})
