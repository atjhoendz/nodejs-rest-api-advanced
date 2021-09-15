import pgp from 'pg-promise';
import config from '../utils/config.js';
import logger from '../utils/logger.js';

const initOptions = {
  error(err, e) {
    if (e.cn) {
      logger.debug(`Error connection: ${err}`);
    }
    if (e.query) {
      logger.debug(`Error query: ${err}`);

      if (e.params) {
        logger.debug(`Error query params: ${err}`);
      }
    }

    if (e.ctx) {
      logger.debug(`Error Context: ${err}`);
    }
  },
};

const conn = pgp(initOptions)(
  `postgres://${config.postgres_user}:${config.postgres_password}@${
    config.postgres_host
  }:${config.postgres_port}/${config.postgresSelectedDB()}`,
);

export default conn;
