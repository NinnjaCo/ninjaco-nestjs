import { Mission } from 'modules/courses/schemas/mission.schema'
import mongoose from 'mongoose'

export const missionStub: () => Mission = () => ({
  _id: new mongoose.Types.ObjectId('5f9d5c2e5a6c2a1f9c2aae4f'),
  title: 'mision1',
  description: 'easy missoin',
  image: 'http://localhost:9000/ninjaco/5b9d2c1e1aaf76f8fa03020628b56adb.jpg',
  categoryId: '64395bb63430e14b5c1f0b3c',
  levels: [
    {
      levelNumber: 4,
      buildingPartsImages: ['http://localhost:9000/ninjaco/510fec3c6aa46254ec24dda97d4668f7.jpeg'],
      stepGuideImages: ['http://localhost:9000/ninjaco/2cc7ea791de0906e8e4d7d9747fc4577.png'],
      websitePreviewImage: 'http://localhost:9000/ninjaco/2cc7ea791de0906e8e4d7d9747fc4577.png',
      _id: new mongoose.Types.ObjectId('5f9d5c2e5a6c2a1f9c2aae4f'),
      createdAt: '2023-04-22T11:30:56.622Z',
      updatedAt: '2023-04-22T11:30:56.622Z',
    },
  ],
  createdAt: '2023-04-21T14:39:40.758Z',
  updatedAt: '2023-04-21T14:39:40.758Z',
})
