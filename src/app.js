import express from 'express';
import cors from 'cors';
import { postPurchase } from './controllers/payment.js';

const app = express();

app.use(express.json());
app.use(cors());

app.post("/purchases", postPurchase);

export default app;
