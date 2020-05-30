import { HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { INestApplication } from '@nestjs/common';

let app: INestApplication;
beforeEach(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  app = moduleFixture.createNestApplication();
  await app.init();
});
describe('ClientController (e2e) fetch columns', () => {
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/columns')
      .set({ Accept: 'application/json' })
      .expect(HttpStatus.OK)
      .expect(({ body }) => {
        expect(body[0].id).toEqual('name')
        expect(body[0].title).toEqual('Name')
      })
  });
});



describe('fetch clients', () => {
  it('fetch clients', () => {
    return request(app.getHttpServer())
      .get('/api/clients?page=1')
      .set('Accept', 'application/json')
      .expect(HttpStatus.OK)
      .expect(({ body }) => {
        expect(body).toBeInstanceOf(Object)
        expect(typeof body.count).toBe('number')
        expect(body.items).toBeInstanceOf(Array)
      })

  })
})


describe('should return validation error for insufficent data', () => {
  it('should save a client', () => {
    return request(app.getHttpServer())
      .post('/api/client')
      .send({
        name: 'John Doe',
      })
      .set('Accept', 'application/json')
      .expect(HttpStatus.UNPROCESSABLE_ENTITY)
      .expect(({ body }) => {
        expect(body).toBeInstanceOf(Array)
      })
  })
})

describe('should successfully save a client provided required fields', () => {
  it('should save a client', () => {
    return request(app.getHttpServer())
      .post('/api/client')
      .send({
        name: 'John Doe',
        gender: 'Male',
        phone: '9821936585',
        email: 'sudingrng@gmail.com',
        dob: '1994-01-07',
        mode_of_contact: 'Email',
        nationality: 'Nepal',
        address: 'Bhaktapur',
        education_background: 'BE'
      })
      .set('Accept', 'application/json')
      .expect(HttpStatus.CREATED)
      .expect(({ text }) => {
        expect(text).toEqual('Successfully Inserted')
      })
  })
})

