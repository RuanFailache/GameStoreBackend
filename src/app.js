import express from 'express';
import cors from 'cors';
import getProduct from './controllers/product';
import postSignUp from './controllers/signup';
import postSignIn from './controllers/signin';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/products/:id', getProduct);
app.post('/sign-up', postSignUp);
app.post('/sign-in', postSignIn);

export default app;
