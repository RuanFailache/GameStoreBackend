import express from 'express';
import cors from 'cors';
import { postPurchase } from './controllers/payment.js';

import getProduct from './controllers/product.js';
import postSignUp from './controllers/signup.js';
import postSignIn from './controllers/signin.js';

import getProducts from './controllers/catalog.js';

const app = express();

app.use(express.json());
app.use(cors());

app.post('/sign-up', postSignUp);
app.post('/sign-in', postSignIn);
app.get('/products', getProducts);
app.get('/products/:id', getProduct);
app.post("/purchases", postPurchase);

export default app;
