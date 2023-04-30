import { LevelProgress } from '../../../usersLevelsProgress/schema/LevelProgress.schema'
import mongoose from 'mongoose'

export const levelProgressStub: () => LevelProgress = () => {
  return {
    _id: new mongoose.Types.ObjectId('64428d6ba27224bccab1999c'),
    courseId: '64428ccca27224bccab19988',
    levelId: '64428ccca27224bccabf49988',
    userId: '6433fa6d115b5cc538b7f317',
    missionId: '64428ccca27224bccab19938',
    progress: '',
    createdAt: 'Fri Apr 21 2023 13:19:39 GMT+0000 (Coordinated Universal Time)',
    updatedAt: 'Fri Apr 21 2023 13:19:39 GMT+0000 (Coordinated Universal Time)',
    __v: 0,
  }
}
