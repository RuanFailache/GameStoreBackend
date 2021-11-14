import express from 'express';
import cors from 'cors';
import connection from './database/database.js';

const app = express();

app.use(express.json());
app.use(cors());

connection.query('SELECT * FROM products;').then(result => {console.log(result.rows)});

app.get('/product/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const productInfo = await connection.query('SELECT * FROM products WHERE id=$1', [id]);
        res.send(productInfo.rows[0]);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

export default app;
