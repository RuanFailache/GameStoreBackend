import '../setup.js';

import supertest from 'supertest';
import app from '../app.js';
import connection from '../database/database.js';
import insertTestUser from '../factories/signIn.factory.js';

describe('GET /sign-in', () => {
  beforeAll(async () => {
    await connection.query('DELETE FROM sessions;');
    await connection.query('DELETE FROM users;');
    await insertTestUser();
  });

  test('Invalid sign-in email format', async () => {
    const body = { email: 'abacate', password: '123123' };
    const response = await supertest(app).post('/sign-in').send(body);
    const { status } = response;
    expect(status).toEqual(400);
  });

  test('Invalid sign-in email', async () => {
    const body = { email: 'abacate@abacate.com', password: '123123' };
    const response = await supertest(app).post('/sign-in').send(body);
    const { status } = response;
    expect(status).toEqual(404);
  });

  test('Invalid sign-in password', async () => {
    const body = { email: 'jonas@test.com', password: '321321' };
    const response = await supertest(app).post('/sign-in').send(body);
    const { status } = response;
    expect(status).toEqual(404);
  });

  test('Successuful sign-in', async () => {
    const body = { email: 'jonas@test.com', password: '123123' };
    const response = await supertest(app).post('/sign-in').send(body);
    const { status } = response;
    expect(status).toEqual(200);
  });
});
