import bycript from 'bcrypt';
import { v4 as uuid } from 'uuid';
import connection from '../database/database';
import signInSchema from '../schemas/signInSchema';

export default async function postSignIn(req, res) {
  const { email, password } = req.body;

  const { error } = signInSchema.validate({ email, password });

  if (error) {
    return res.sendStatus(400);
  }

  try {
    const login = await connection.query(
      'SELECT * FROM users WHERE email = $1 LIMIT 1;',
      [email],
    );

    if (login.rowCount === 0) {
      return res.sendStatus(404);
    }

    const userPassword = login.rows[0].password;
    const isValidPassword = bycript.compareSync(password, userPassword);

    if (!isValidPassword) {
      return res.sendStatus(404);
    }

    const token = uuid();
    const userId = login.rows[0].id;

    await connection.query(
      'INSERT INTO sessions ("user-id", token) VALUES ($1, $2);',
      [userId, token],
    );

    return res.send({ token });
  } catch {
    return res.sendStatus(500);
  }
}
