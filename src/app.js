import express from 'express';
import cors from 'cors';
import getProduct from './controllers/product.js';
import postSignUp from './controllers/signup.js';
import postSignIn from './controllers/signin.js';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/products/:id', getProduct);
app.post('/sign-up', postSignUp);
app.post('/sign-in', postSignIn);

export default app;
