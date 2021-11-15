import express from 'express';
import cors from 'cors';

import { getProducts } from './controllers/catalog.js';

const app = express();

app.use(express.json());
app.use(cors());

app.get("/products", getProducts);

export default app;
