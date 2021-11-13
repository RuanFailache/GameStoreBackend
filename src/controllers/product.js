import connection from '../database/database';

export default async function getProduct(req, res) {
  const { id } = req.params;

  try {
    const response = await connection.query('SELECT * FROM products WHERE id = $1 LIMIT 1;', [id]);

    if (response.rowCount === 0) {
      res.sendStatus(404);
    } else {
      res.send(response.rows[0]);
    }
  } catch (error) {
    res.sendStatus(500);
  }
}
