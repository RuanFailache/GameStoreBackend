import bycript from 'bcrypt';
import connection from '../database/database';
import signUpSchema from '../schemas/signUpSchema';

export default async function postSignUp(req, res) {
  const { name, email, password } = req.body;

  const { error } = signUpSchema.validate(req.body);

  if (error) {
    return res.sendStatus(400);
  }

  const hashPassword = bycript.hashSync(password, 12);

  try {
    const hasEmail = await connection.query('SELECT * FROM users WHERE email = $1;', [email]);

    if (hasEmail.rowCount > 0) {
      return res.sendStatus(409);
    }

    await connection.query('INSERT INTO users (name, password, email) VALUES ($1, $2, $3)', [name, hashPassword, email]);

    return res.sendStatus(201);
  } catch {
    return res.sendStatus(500);
  }
}
