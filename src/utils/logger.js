import winston from 'winston';
import config from './config.js';
const { createLogger, format, transports } = winston;

const logger = createLogger({
  format: format.combine(format.colorize({ all: true }), format.simple()),
  transports: [new transports.Console({ level: config.loggerLevel })],
});

export default logger;
