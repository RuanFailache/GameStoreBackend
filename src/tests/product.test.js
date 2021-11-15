import '../setup.js';
import supertest from 'supertest';
import app from '../app.js';
import connection from '../database/database.js';
import insertProductOnDatabase from '../factories/product.factory.js';

describe('GET /products/:id', () => {
  beforeAll(async () => {
    await connection.query('delete from products;');
  });

  afterAll(() => {
    connection.end();
  });

  test('Without any products', async () => {
    const response = await supertest(app).get('/products/1');
    expect(response.status).toEqual(404);
  });

  test('Product with an invalid id', async () => {
    const response = await supertest(app).get('/products/0');
    expect(response.status).toEqual(404);
  });

  test('Product with a valid id', async () => {
    const resDatabase = await insertProductOnDatabase();
    const { id } = resDatabase.rows[0];
    const response = await supertest(app).get(`/products/${id}`);
    expect(response.status).toEqual(200);
  });
});