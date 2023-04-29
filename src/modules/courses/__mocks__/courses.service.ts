import { courseStub } from '../test/stubs/course.stub'

export const CoursesService = jest.fn().mockReturnValue({
  findAll: jest.fn().mockResolvedValue([courseStub()]),
  findCourseById: jest.fn().mockResolvedValue(courseStub()),
  createCourse: jest.fn().mockResolvedValue(courseStub()),
  deleteCourse: jest.fn().mockResolvedValue(courseStub()),
  updateCourse: jest.fn().mockResolvedValue(courseStub()),
})
