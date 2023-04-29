import { RoleEnum } from 'modules/roles/roles.enum'
import { UserPlayGame } from 'modules/usersPlayGames/schemas/userPlayGame.schema'
import mongoose from 'mongoose'

export const userPlayGameStub: () => UserPlayGame = () => {
  return {
    _id: new mongoose.Types.ObjectId('644ceba57b6e0c32557e428c'),
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
    game: {
      _id: new mongoose.Types.ObjectId('6443f7880104c20098c49919'),
      title: 'easy game',
      image: 'http://localhost:9000/ninjaco/6c0cdaaa04f4be6760c589bcc611bc1c.PNG',
      playerDirection: 'RIGHT',
      numOfBlocks: 3,
      sizeOfGrid: 7,
      playerLocation: [2, 2],
      goalLocation: [2, 4],
      wallsLocations: [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
        [0, 5],
        [0, 6],
        [0, 7],
        [0, 8],
        [0, 9],
        [0, 10],
        [0, 11],
        [0, 12],
        [0, 13],
        [0, 14],
        [1, 0],
        [1, 14],
        [2, 0],
        [2, 14],
        [3, 0],
        [3, 14],
        [4, 0],
        [4, 14],
        [5, 0],
        [5, 14],
        [6, 0],
        [6, 14],
        [7, 0],
        [7, 14],
        [8, 0],
        [8, 14],
        [9, 0],
        [9, 14],
        [10, 0],
        [10, 14],
        [11, 0],
        [11, 14],
        [12, 0],
        [12, 14],
        [13, 0],
        [13, 14],
        [14, 0],
        [14, 1],
        [14, 2],
        [14, 3],
        [14, 4],
        [14, 5],
        [14, 6],
        [14, 7],
        [14, 8],
        [14, 9],
        [14, 10],
        [14, 11],
        [14, 12],
        [14, 13],
        [14, 14],
      ],
      createdAt: 'Sat Apr 22 2023 15:04:40 GMT+0000 (Coordinated Universal Time)',
      updatedAt: 'Sat Apr 22 2023 15:04:40 GMT+0000 (Coordinated Universal Time)',
      __v: 0,
    },
    startedAt: '2023-04-29T10:04:21.241Z',
    gameProgress: {
      _id: new mongoose.Types.ObjectId('644ceba57b6e0c32557e428a'),
      userId: '5f9d5c2e5a6c2a1f9c2aae4f',
      gameId: '6443f7880104c20098c49919',
      progress: '',
      createdAt: 'Sat Apr 29 2023 10:04:21 GMT+0000 (Coordinated Universal Time)',
      updatedAt: 'Sat Apr 29 2023 10:04:21 GMT+0000 (Coordinated Universal Time)',
      __v: 0,
    },
    completed: true,
    createdAt: 'Sat Apr 29 2023 10:04:21 GMT+0000 (Coordinated Universal Time)',
    updatedAt: 'Sat Apr 29 2023 10:04:29 GMT+0000 (Coordinated Universal Time)',
    __v: 0,
  }
}
