import { courseStub } from '../test/stubs/course.stub'

export const CoursesService = jest.fn().mockReturnValue({
  findAll: jest.fn().mockResolvedValue([courseStub()]),
  findCourseById: jest.fn().mockResolvedValue(courseStub()),
  createCourse: jest.fn().mockResolvedValue(courseStub()),
  deleteCourse: jest.fn().mockResolvedValue(courseStub()),
  updateCourse: jest.fn().mockResolvedValue(courseStub()),
  findAllMissions: jest.fn().mockResolvedValue([courseStub()]),
  findMissionById: jest.fn().mockResolvedValue(courseStub()),
  createMission: jest.fn().mockResolvedValue(courseStub()),
  deleteMission: jest.fn().mockResolvedValue(courseStub()),
  updateMission: jest.fn().mockResolvedValue(courseStub()),
  findAllLevels: jest.fn().mockResolvedValue([courseStub()]),
  findLevelById: jest.fn().mockResolvedValue(courseStub()),
  createLevel: jest.fn().mockResolvedValue(courseStub()),
  deleteLevel: jest.fn().mockResolvedValue(courseStub()),
  updateLevel: jest.fn().mockResolvedValue(courseStub()),
})
