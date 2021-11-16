import '../setup.js';

import supertest from 'supertest';
import app from '../app.js';
import insertTestUser from '../factories/signIn.factory.js';

import connection from '../database/database.js';

describe('POST /payment', () => {
    beforeAll(async () => {
      await connection.query('DELETE FROM purchases_products;');
      await connection.query('DELETE FROM purchases;');
    });

    test('Sucessful post returns 201', async() => {
        const body = {
            
            userId: 10,
            paymentMethod: "credit-card",
            products:[
                {
                    "productId": 1,
                    "amount": 2
                },
                {
                    "productId": 2,
                    "amount": 2
                },
                {
                    "productId": 3,
                    "amount": 1
                }
            ]
        };

        const result = await supertest(app).post("/purchases").send(body);
        const status = result.status;

        expect(status).toEqual(201);
    });

    test('Invalid payment method returns 400', async() => {
        const body = {
            
            userId: 10,
            paymentMethod: "pix",
            products:[
                {
                    "productId": 1,
                    "amount": 2
                },
                {
                    "productId": 2,
                    "amount": 2
                },
                {
                    "productId": 3,
                    "amount": 1
                }
            ]
        };

        const result = await supertest(app).post("/purchases").send(body);
        const status = result.status;

        expect(status).toEqual(400);
    });

    test('No products returns 400', async() => {
        const body = {
            
            userId: 10,
            paymentMethod: "pix",
            products:[]
        };

        const result = await supertest(app).post("/purchases").send(body);
        const status = result.status;

        expect(status).toEqual(400);
    });

});