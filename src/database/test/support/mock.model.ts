import { FilterQuery } from 'mongoose'

export class MockModel<T> {
  protected entityStub: T

  constructor(createEntityData: T) {
    this.constructorSpy(createEntityData)
  }

  constructorSpy(_createEntityData: T): void {}

  findOne(query: FilterQuery<T>): { exec: () => T } {
    return { exec: (): T => this.entityStub }
  }

  async find(query: FilterQuery<T>): Promise<T[]> {
    return [this.entityStub]
  }

  async save(): Promise<T> {
    return this.entityStub
  }

  async findOneAndUpdate(query: FilterQuery<T>): Promise<T> {
    return this.entityStub
  }

  async findOneAndDelete(query: FilterQuery<T>): Promise<T> {
    return this.entityStub
  }
  async updateMany(): Promise<boolean> {
    return true
  }
  async deleteMany(): Promise<boolean> {
    return true
  }
}
