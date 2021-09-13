import pgp from 'pg-promise';
import config from '../utils/config.js';

const initOptions = {
  connect(client, dc, useCount) {
    const cp = client.connectionParameters;
    console.log(`Connected to database: ${cp.database}`);
  },
  disconnect(client, dc) {
    const cp = client.connectionParameters;
    console.log(`Disconnecting from database: ${cp.database}`);
  },
  error(err, e) {
    if (e.cn) {
      console.log(`Error connection: ${err}`);
    }
    if (e.query) {
      console.log(`Error query: ${err}`);

      if (e.params) {
        console.log(`Error query params: ${err}`);
      }
    }

    if (e.ctx) {
      console.log(`Error Context: ${err}`);
    }
  },
};

const conn = pgp(initOptions)(
  `postgres://${config.postgres_user}:${config.postgres_password}@${config.postgres_host}:${config.postgres_port}/${config.postgres_db}`,
);

export default conn;
