import { HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
const app = 'http://localhost:3000'

describe('ClientController (e2e) fetch columns', () => {
  it('/ (GET)', () => {
    return request(app)
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
    return request(app)
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

describe('error while saving a client', () => {
  it('should send validation error while saving a client client', () => {
    return request(app)
      .post('/api/client')
      .set('Accept', 'application/json')
      .expect(HttpStatus.BAD_REQUEST)
      .expect(({ body }) => {
        expect(body.statusCode).toEqual(400)
      })
  })
})

describe('should successfully save a client provided required fields', () => {
  it('should save a client', () => {
    return request(app)
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

