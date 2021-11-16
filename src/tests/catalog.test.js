import supertest from 'supertest';
import app from '../app.js';

describe('GET /products', () => {
  test('returns 200 for successful get products', async () => {
    const result = await supertest(app).get('/products');
    const { status } = result;

    expect(status).toEqual(200);
  });
});
