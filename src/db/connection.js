import pgp from 'pg-promise';
import config from '../utils/config.js';
import logger from '../utils/logger.js';

const initOptions = {
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

const dbName = config.isDev() ? config.postgres_db : config.postgres_db_test;

const conn = pgp(initOptions)(
  `postgres://${config.postgres_user}:${config.postgres_password}@${config.postgres_host}:${config.postgres_port}/${dbName}`,
);

export default conn;
