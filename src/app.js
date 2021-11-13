import express from 'express';
import cors from 'cors';
import getProduct from './controllers/product';
import postSignUp from './controllers/signup';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/products/:id', getProduct);

app.post('/signup', postSignUp);

export default app;
