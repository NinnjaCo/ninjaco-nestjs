export class MockModel<T> {
  protected entityStub: T

  constructor(createEntityData: T) {
    this.constructorSpy(createEntityData)
  }

  constructorSpy(_createEntityData: T): void {}

  findOne(): { exec: () => T } {
    return { exec: (): T => this.entityStub }
  }

  async find(): Promise<T[]> {
    return [this.entityStub]
  }

  async save(): Promise<T> {
    return this.entityStub
  }

  async findOneAndUpdate(): Promise<T> {
    return this.entityStub
  }

  async findOneAndDelete(): Promise<T> {
    return this.entityStub
  }
  async updateMany(): Promise<boolean> {
    return true
  }
  async deleteMany(): Promise<boolean> {
    return true
  }
}
