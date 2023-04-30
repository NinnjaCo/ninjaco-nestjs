import { courseEnrollmentStub } from '../test/stubs/courseEnrollment.stub'

export const CourseEnrollmentsService = jest.fn().mockReturnValue({
  findAllCourses: jest.fn().mockResolvedValue([courseEnrollmentStub()]),
  findCourseById: jest.fn().mockResolvedValue(courseEnrollmentStub()),
  deleteCourse: jest.fn().mockResolvedValue(courseEnrollmentStub()),
  createCourseEnrollement: jest.fn().mockResolvedValue(courseEnrollmentStub()),
  createMissionProgress: jest.fn().mockResolvedValue(courseEnrollmentStub()),
  findAllMissions: jest.fn().mockResolvedValue([courseEnrollmentStub()]),
  findMissionById: jest.fn().mockResolvedValue(courseEnrollmentStub()),
  findAllLevels: jest.fn().mockResolvedValue([courseEnrollmentStub()]),
  findLevelById: jest.fn().mockResolvedValue(courseEnrollmentStub()),
  createLevelProgress: jest.fn().mockResolvedValue(courseEnrollmentStub()),
  updateProgress: jest.fn().mockResolvedValue(courseEnrollmentStub()),
})
