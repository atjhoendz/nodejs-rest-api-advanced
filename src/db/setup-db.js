import logger from '../utils/logger.js';
import conn from './connection.js';

const args = process.argv.slice(2);

const createUserTable = async () => {
  const query = `
  CREATE TABLE IF NOT EXISTS users
  (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30),
    email VARCHAR(50) UNIQUE NOT NULL,
    created_at DATE NOT NULL
  )
  `;

  try {
    await conn.query(query);
  } catch (err) {
    throw err;
  }
};

const dropUserTable = async () => {
  const query = `DROP TABLE IF EXISTS users`;

  try {
    await conn.query(query);
  } catch (err) {
    throw err;
  }
};

const createAllTable = async () => {
  await createUserTable();
};

const dropAllTable = async () => {
  await dropUserTable();
};

switch (args[0]) {
  case 'createAllTable':
    await createAllTable();
    break;
  case 'dropAllTable':
    await dropAllTable();
    break;
  default:
    logger.debug(`Argument ${args[0]} doesn't provided`);
}
