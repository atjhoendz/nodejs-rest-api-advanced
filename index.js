import logger from './src/utils/logger.js';
import config from './src/utils/config.js';
import server from './src/server.js';

server.listen(config.port, () => {
  logger.info(`Listening on PORT ${config.port}`);
});
