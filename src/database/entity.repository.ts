import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose'

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>
  ): Promise<T | null> {
    return await this.entityModel
      .findOne(entityFilterQuery, {
        ...projection,
      })
      .exec()
  }

  async find(entityFilterQuery: FilterQuery<T>): Promise<T[] | null> {
    return await this.entityModel.find(entityFilterQuery)
  }

  async create(createEntityData: unknown): Promise<T> {
    const entity = new this.entityModel(createEntityData)
    return await entity.save()
  }

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>
  ): Promise<T | null> {
    return await this.entityModel.findOneAndUpdate(entityFilterQuery, updateEntityData, {
      new: true,
    })
  }

  async findOneAndDelete(entityFilterQuery: FilterQuery<T>): Promise<T | null> {
    return await this.entityModel.findOneAndDelete(entityFilterQuery)
  }

  async updateMany(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>
  ): Promise<boolean> {
    const updateResult = await this.entityModel.updateMany(entityFilterQuery, updateEntityData)
    return updateResult.modifiedCount >= 1
  }

  async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const deleteResult = await this.entityModel.deleteMany(entityFilterQuery)
    return deleteResult.deletedCount >= 1
  }
}
