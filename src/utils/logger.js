import winston from 'winston';
const { createLogger, format, transports } = winston;

const logger = createLogger({
  format: format.combine(format.colorize({ all: true }), format.simple()),
  transports: [new transports.Console({ level: 'debug' })],
});

export default logger;
