import faker from 'faker';
import connection from '../database/database.js';

export default async function insertProductOnDatabase() {
  return connection.query(`
    INSERT INTO products (
      name,
      price,
      description, 
      banner, 
      cover, 
      "first-image", 
      "second-image"
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7
    ) RETURNING *;`, [
    faker.name.jobArea(),
    faker.finance.amount() * 100,
    faker.lorem.lines(10),
    faker.image.image(),
    faker.image.abstract(),
    faker.image.food(),
    faker.image.animals(),
  ]);
}
