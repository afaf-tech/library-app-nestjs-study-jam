import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let access_token = '';
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
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    console.log(access_token);
    const expectedResponse = JSON.stringify({
      data: 'Hello World!',
    });
    return request(app.getHttpServer())
      .get('/')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${access_token}`)
      .expect(200)
      .expect(expectedResponse);
  });

  it('/johny (GET)', () => {
    const expectedResponse = JSON.stringify({
      data: 'Hello Johny!',
    });

    return request(app.getHttpServer())
      .get('/johny')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${access_token}`)
      .expect(200)
      .expect(expectedResponse);
  });
});
