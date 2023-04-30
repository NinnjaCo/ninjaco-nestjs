import { Course, CourseType } from '../../../courses/schemas/course.schema'
import mongoose from 'mongoose'

export const courseStub: () => Course = () => ({
  _id: new mongoose.Types.ObjectId('5f9d5c2e5a6c2a1f9c2aae4f'),
  title: 'course1',
  description: 'easy course',
  image: 'http://localhost:9000/ninjaco/8d7da45db94d4f7d5aff8d2e7a9f0a68.jpg',
  ageRange: ['12+'],
  preRequisites: ['nada'],
  objectives: ['maths '],
  type: CourseType.ARDUINO,
  missions: [
    {
      title: 'mision1',
      description: 'easy missoin',
      image: 'http://localhost:9000/ninjaco/5b9d2c1e1aaf76f8fa03020628b56adb.jpg',
      categoryId: '64395bb63430e14b5c1f0b3c',
      levels: [
        {
          levelNumber: 4,
          buildingPartsImages: [
            'http://localhost:9000/ninjaco/510fec3c6aa46254ec24dda97d4668f7.jpeg',
          ],
          stepGuideImages: ['http://localhost:9000/ninjaco/2cc7ea791de0906e8e4d7d9747fc4577.png'],
          websitePreviewImage: 'http://localhost:9000/ninjaco/2cc7ea791de0906e8e4d7d9747fc4577.png',
          _id: new mongoose.Types.ObjectId('5f9d5c2e5a6c2a1f9c2aae4f'),
          createdAt: '2023-04-22T11:30:56.622Z',
          updatedAt: '2023-04-22T11:30:56.622Z',
        },
      ],
      _id: new mongoose.Types.ObjectId('5f9d5c2e5a6c2a1f9c2aae4f'),
      createdAt: '2023-04-21T14:39:40.758Z',
      updatedAt: '2023-04-21T14:39:40.758Z',
    },
  ],
  createdAt: 'Fri Apr 21 2023 14:39:05 GMT+0000 (Coordinated Universal Time)',
  updatedAt: 'Sat Apr 22 2023 11:30:56 GMT+0000 (Coordinated Universal Time)',
})
