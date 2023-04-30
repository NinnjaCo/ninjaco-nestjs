import { GameProgress } from 'modules/usersGameProgress/schema/game-progress.schema'
import mongoose from 'mongoose'

export const gameProgressStub: () => GameProgress = () => {
  return {
    _id: new mongoose.Types.ObjectId('644ceba57b6e0c32557e428a'),
    userId: '6432b0f435aecea91aa404f8',
    gameId: '6443f7880104c20098c49919',
    progress: '',
    createdAt: 'Sat Apr 29 2023 10:04:21 GMT+0000 (Coordinated Universal Time)',
    updatedAt: 'Sat Apr 29 2023 10:04:21 GMT+0000 (Coordinated Universal Time)',
    __v: 0,
  }
}
