import bcrypt from 'bcrypt';
import connection from '../database/database';

export default function insertTestUser() {
  const name = 'Jonas';
  const email = 'jonas@test.com';
  const password = bcrypt.hashSync('123123', 12);

  connection.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3);',
    [name, email, password],
  );
}
