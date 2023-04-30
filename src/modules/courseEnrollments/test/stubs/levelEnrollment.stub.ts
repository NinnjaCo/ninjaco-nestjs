import { LevelManagement } from 'modules/courseEnrollments/schemas/LevelManagement.schema'
import { MissionManagement } from '../../schemas/MissionManagement.schema'
import mongoose from 'mongoose'

export const levelEnrollmentStub = (): LevelManagement => ({
  startedAt: '2023-04-23T20:56:59.700Z',
  completed: false,
  level: {
    levelNumber: 4,
    buildingPartsImages: ['http://localhost:9000/ninjaco/510fec3c6aa46254ec24dda97d4668f7.jpeg'],
    stepGuideImages: ['http://localhost:9000/ninjaco/2cc7ea791de0906e8e4d7d9747fc4577.png'],
    websitePreviewImage: 'http://localhost:9000/ninjaco/2cc7ea791de0906e8e4d7d9747fc4577.png',
    _id: new mongoose.Types.ObjectId('5f9d5c2e5a6c2a1f9c2aae4f'),
    createdAt: '2023-04-22T11:30:56.622Z',
    updatedAt: '2023-04-22T11:30:56.622Z',
  },
  levelProgress: {
    _id: new mongoose.Types.ObjectId('5f9d5c2e5a6c2a1f9c2aae4f'),
    courseId: '5f9d5c2e5a6c2a1f9c2aae4f',
    levelId: '5f9d5c2e5a6c2a1f9c2aae4f',
    userId: '5f9d5c2e5a6c2a1f9c2aae4f',
    missionId: '5f9d5c2e5a6c2a1f9c2aae4f',
    progress: '',
    createdAt: 'Thu Apr 27 2023 16:14:44 GMT+0000 (Coordinated Universal Time)',
    updatedAt: 'Thu Apr 27 2023 16:14:44 GMT+0000 (Coordinated Universal Time)',
  },
  _id: new mongoose.Types.ObjectId('5f9d5c2e5a6c2a1f9c2aae4f'),
  createdAt: '2023-04-23T20:56:59.936Z',
  updatedAt: '2023-04-23T20:56:59.936Z',
})
