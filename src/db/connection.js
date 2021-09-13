import pgp from 'pg-promise';
import config from '../utils/config.js';
import logger from '../utils/logger.js';

const initOptions = {
  connect(client, dc, useCount) {
    const cp = client.connectionParameters;
    logger.debug(`Connected to database: ${cp.database}`);
  },
  disconnect(client, dc) {
    const cp = client.connectionParameters;
    logger.debug(`Disconnecting from database: ${cp.database}`);
  },
  error(err, e) {
    if (e.cn) {
      logger.error(`Error connection: ${err}`);
    }
    if (e.query) {
      logger.error(`Error query: ${err}`);

      if (e.params) {
        logger.error(`Error query params: ${err}`);
      }
    }

    if (e.ctx) {
      logger.error(`Error Context: ${err}`);
    }
  },
};

const conn = pgp(initOptions)(
  `postgres://${config.postgres_user}:${config.postgres_password}@${config.postgres_host}:${config.postgres_port}/${config.postgres_db}`,
);

export default conn;
