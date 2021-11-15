import express from 'express';
import cors from 'cors';

import getProduct from './controllers/product.js';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/products/:id', getProduct);

export default app;
