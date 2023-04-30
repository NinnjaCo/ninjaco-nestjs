import { Level } from 'modules/courses/schemas/level.schema'
import mongoose from 'mongoose'

export const levelStub: () => Level = () => ({
  _id: new mongoose.Types.ObjectId('5f9d5c2e5a6c2a1f9c2aae4f'),
  levelNumber: 4,
  buildingPartsImages: ['http://localhost:9000/ninjaco/510fec3c6aa46254ec24dda97d4668f7.jpeg'],
  stepGuideImages: ['http://localhost:9000/ninjaco/2cc7ea791de0906e8e4d7d9747fc4577.png'],
  websitePreviewImage: 'http://localhost:9000/ninjaco/2cc7ea791de0906e8e4d7d9747fc4577.png',
  createdAt: '2023-04-21T14:39:40.758Z',
  updatedAt: '2023-04-21T14:39:40.758Z',
})
