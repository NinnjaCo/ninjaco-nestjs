import { courseStub } from '../test/stubs/course.stub'

export const CoursesService = jest.fn().mockReturnValue({
  findAll: jest.fn().mockResolvedValue([courseStub()]),
  findOne: jest.fn().mockResolvedValue(courseStub()),
  create: jest.fn().mockResolvedValue(courseStub()),
  remove: jest.fn().mockResolvedValue(courseStub()),
  update: jest.fn().mockResolvedValue(courseStub()),
})
