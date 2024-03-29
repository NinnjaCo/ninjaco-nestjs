import { CourseEnrollment } from '../../schemas/courseEnrollment.schema'
import { CourseType } from '../../../courses/schemas/course.schema'
import { RoleEnum } from '../../../roles/roles.enum'
import mongoose from 'mongoose'

export const courseEnrollmentStub: () => CourseEnrollment = () => ({
  _id: new mongoose.Types.ObjectId('5f9d5c2e5a6c2a1f9c2aae4f'),
  user: {
    _id: new mongoose.Types.ObjectId('5f9d5c2e5a6c2a1f9c2aae4f'),
    createdAt: '2023-04-12T20:20:07.607Z',
    updatedAt: 'Sun Apr 23 2023 17:15:55 GMT+0000 (Coordinated Universal Time)',
    firstName: 'user',
    lastName: 'user',
    dateOfBirth: '2002-02-11T21:31:22.000Z',
    email: 'zouzou@gmail.com',
    password: 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f',
    isVerified: true,
    resetPasswordToken: 'b9b015b7cdef511dfbe8622e02675d4192ddc683c35aac613ae1d85ffca98eae',
    verifyEmailToken: 'b9b015b7cdef511dfbe8622e02675d4192ddc683c35aac613ae1d85ffca98eae',
    profilePicture: 'any_picture',
    role: {
      _id: new mongoose.Types.ObjectId('5f9d5c2e5a6c2a1f9c2aae4f'),
      createdAt: '2023-04-08T15:35:45.804Z',
      updatedAt: '2023-04-08T15:35:45.805Z',
      role: RoleEnum.USER,
    },
    points: 0,
    hashedRt: 'b9b015b7cdef511dfbe8622e02675d4192ddc683c35aac613ae1d85ffca98eae',
  },
  course: {
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
            websitePreviewImage:
              'http://localhost:9000/ninjaco/2cc7ea791de0906e8e4d7d9747fc4577.png',
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
  },
  enrolledAt: '2023-04-20T17:15:11.783Z',
  completed: false,
  missions: [
    {
      mission: {
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
            websitePreviewImage:
              'http://localhost:9000/ninjaco/2cc7ea791de0906e8e4d7d9747fc4577.png',
            _id: new mongoose.Types.ObjectId('5f9d5c2e5a6c2a1f9c2aae4f'),
            createdAt: '2023-04-22T11:30:56.622Z',
            updatedAt: '2023-04-22T11:30:56.622Z',
          },
        ],
        _id: new mongoose.Types.ObjectId('5f9d5c2e5a6c2a1f9c2aae4f'),
        createdAt: '2023-04-21T14:39:40.758Z',
        updatedAt: '2023-04-21T14:39:40.758Z',
      },
      startedAt: '2023-04-23T20:56:59.700Z',
      completed: false,
      levels: [
        {
          level: {
            levelNumber: 4,
            buildingPartsImages: [
              'http://localhost:9000/ninjaco/510fec3c6aa46254ec24dda97d4668f7.jpeg',
            ],
            stepGuideImages: ['http://localhost:9000/ninjaco/2cc7ea791de0906e8e4d7d9747fc4577.png'],
            websitePreviewImage:
              'http://localhost:9000/ninjaco/2cc7ea791de0906e8e4d7d9747fc4577.png',
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
          completed: false,
          startedAt: '2023-04-23T20:56:59.936Z',
          _id: new mongoose.Types.ObjectId('5f9d5c2e5a6c2a1f9c2aae4f'),
          createdAt: '2023-04-23T20:56:59.936Z',
          updatedAt: '2023-04-23T20:56:59.936Z',
        },
      ],
      _id: new mongoose.Types.ObjectId('5f9d5c2e5a6c2a1f9c2aae4f'),
      createdAt: '2023-04-23T20:56:59.936Z',
      updatedAt: '2023-04-23T20:56:59.936Z',
    },
  ],
  createdAt: 'Thu Apr 20 2023 17:15:11 GMT+0000 (Coordinated Universal Time)',
  updatedAt: 'Thu Apr 20 2023 20:03:27 GMT+0000 (Coordinated Universal Time)',
})
