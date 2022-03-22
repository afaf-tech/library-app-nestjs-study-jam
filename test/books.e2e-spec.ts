import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let access_token = '';
  let access_token_admin = '';
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await request(app.getHttpServer())
      .post('/v1/auth/login')
      .send({ username: 'user', password: 'user123' })
      .set('Accept', 'application/json')
      .expect(201)
      .then(function (res) {
        // console.log(res.body);
        access_token = res.body.data.access_token;
      });
    await request(app.getHttpServer())
      .post('/v1/auth/login')
      .send({ username: 'admin', password: 'admin123' })
      .set('Accept', 'application/json')
      .expect(201)
      .then(function (res) {
        // console.log(res.body);
        access_token_admin = res.body.data.access_token;
      });
  });

  afterAll(async () => {
    await app.close();
  });

  it('/books/:id (GET)', () => {
    const expectedResponse = {
      data: {
        id: 1,
        title: 'Hujan',
        author: 'Tere Liye',
        publisher: 'gramedia',
        description: 'bla bla',
        createdAt: '2022-03-09T06:45:39.105Z',
        updatedAt: '2022-03-09T06:45:39.124Z',
      },
    };
    return request(app.getHttpServer())
      .get('/v1/books/1')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${access_token}`)
      .expect(200)
      .expect(expectedResponse);
  });

  it('/books/:id (GET) 404', () => {
    return request(app.getHttpServer())
      .get('/v1/books/10')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${access_token}`)
      .expect(404);
  });

  it('/books/ (POST) 403 Forbidden', () => {
    return request(app.getHttpServer())
      .post('/v1/books')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${access_token}`)
      .expect(403);
  });

  it('/books/ (POST) 201 Created', () => {
    return request(app.getHttpServer())
      .post('/v1/books')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${access_token_admin}`)
      .expect(403);
  });
});
