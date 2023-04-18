import * as request from 'supertest'
import { AppModule } from '../src/modules/app/app.module'
import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'

describe('AppController', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await Promise.all([app.close()])
  })

  it('/health (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/health')
    expect(response.status).toBe(200)
  })
})
