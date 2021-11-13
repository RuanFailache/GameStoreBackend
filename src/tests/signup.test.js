import '../setup.js';

import supertest from 'supertest';
import app from '../app.js';

import connection from '../database/database.js';
import createSignUpBody from '../factories/signup.factory.js';

describe('POST /sign-up', () => {
  const auxName = 'Jonas';
  const auxPassword = '123123';
  const auxEmail = 'jonas@test.com';

  beforeAll(async () => {
    await connection.query('DELETE FROM users;');
    await connection.query(
      'INSERT INTO users (name, password, email) VALUES ($1, $2, $3)',
      [auxName, auxPassword, auxEmail],
    );
  });

  afterAll(() => {
    connection.end();
  });

  test('Invalid name', async () => {
    const body = { ...createSignUpBody(), name: '' };
    const response = await supertest(app).post('/sign-up').send(body);
    const { status } = response;
    expect(status).toEqual(400);
  });

  test('Invalid password', async () => {
    const body = { ...createSignUpBody(), password: '' };
    const response = await supertest(app).post('/sign-up').send(body);
    const { status } = response;
    expect(status).toEqual(400);
  });

  test('Invalid email', async () => {
    const body = { ...createSignUpBody(), email: '' };
    const response = await supertest(app).post('/sign-up').send(body);
    const { status } = response;
    expect(status).toEqual(400);
  });

  test('Existing email', async () => {
    const body = {
      name: auxName,
      password: auxPassword,
      email: auxEmail,
    };
    const response = await supertest(app).post('/sign-up').send(body);
    const { status } = response;
    expect(status).toEqual(409);
  });

  test('Successuful sing up', async () => {
    const body = createSignUpBody();
    const response = await supertest(app).post('/sign-up').send(body);
    const { status } = response;
    expect(status).toEqual(201);
  });
});
