import { Test, TestingModule } from '@nestjs/testing'
import { HttpServer, INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/modules/app/app.module'
import { Connection } from 'mongoose'
import { DatabaseService } from '../src/database/database.service'

describe('AppController', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('/health (GET)', () => {
    return request(app.getHttpServer()).get('/health').expect(200)
  })
})
