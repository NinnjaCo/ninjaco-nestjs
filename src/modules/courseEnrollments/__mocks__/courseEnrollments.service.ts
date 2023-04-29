import { courseEnrollmentStub } from '../test/stubs/courseEnrollment.stub'

export const CourseEnrollmentsService = jest.fn().mockReturnValue({
  findAllCourses: jest.fn().mockResolvedValue([courseEnrollmentStub()]),
  findCourseById: jest.fn().mockResolvedValue(courseEnrollmentStub()),
  deleteCourse: jest.fn().mockResolvedValue(courseEnrollmentStub()),
  createCourseEnrollement: jest.fn().mockResolvedValue(courseEnrollmentStub()),
})
