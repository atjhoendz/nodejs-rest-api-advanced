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
    created_at TIMESTAMPTZ NOT NULL DEFAULT(CURRENT_TIMESTAMP)
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

const refreshDB = async () => {
  await dropAllTable();
  await createAllTable();
};

switch (args[0]) {
  case 'init':
    await createAllTable();
    break;
  case 'drop':
    await dropAllTable();
    break;
  case 'refresh':
    await refreshDB();
    break;
  default:
    logger.debug(`Argument ${args[0]} doesn't provided`);
}
