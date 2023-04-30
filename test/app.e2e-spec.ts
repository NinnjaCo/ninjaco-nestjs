import * as request from 'supertest'
import { AppModule } from '../src/modules/app/app.module'
import { AuthResponse } from 'modules/auth/interfaces'
import { INestApplication } from '@nestjs/common'
import { SignUpDto } from '../src/modules/auth/dto/signup.dto'
import { Test, TestingModule } from '@nestjs/testing'

describe('AppController', () => {
  let app: INestApplication
  let token: string

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  beforeEach(async () => {
    const signinDto = {
      email: 'test@test.com',
      password: 'testtest',
    }
    const response = await request(app.getHttpServer()).post('/auth/local/signin').send(signinDto)
    token = response.body.access_token
  })

  afterAll(async () => {
    await Promise.all([app.close()])
  })

  it('/health (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/health')
    expect(response.status).toBe(200)
  })

  it('/auth/register (POST)', async () => {
    const signupDto: SignUpDto = {
      dateOfBirth: '2021-01-01T00:00:00.000Z',
      email: 'test@test.com',
      firstName: 'test',
      lastName: 'test',
      password: 'testtest',
    }
    const response = await request(app.getHttpServer()).post('/auth/local/signup').send(signupDto)
    expect(response.status).toBeDefined()
  })

  it('/auth/login (POST)', async () => {
    const response = await request(app.getHttpServer()).post('/auth/local/signin').send({
      email: 'test@test.com',
      password: 'testtest',
    })
    token = response.body.access_token
    expect(response.status).toBeDefined()
  })

  it('/auth/logout (POST)', async () => {
    console.log('token', token)
    const response = await request(app.getHttpServer())
      .post('/auth/logout')
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBeDefined()
  })

  it('/auth/refresh (POST)', async () => {
    console.log('token', token)
    const response = await request(app.getHttpServer())
      .post('/auth/refresh')
      .set('Authorization', `Bearer ${token}`)
    expect(response).toBeDefined()
  })

  it('/courses (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/courses')
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBeDefined()
  })
})
