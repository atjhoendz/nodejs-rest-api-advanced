import redis from 'redis';
import config from './config.js';
import logger from './logger.js';

const client = redis.createClient(config.redis_port, config.redis_host);

client.on('error', (err) => {
  logger.error(err);
});

export default client;
