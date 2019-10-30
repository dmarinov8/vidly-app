const winston = require('winston');
// require('winston-mongodb');

const logger = winston.createLogger({
    transports: [
      new winston.transports.Console({ format: winston.format.combine(winston.format.colorize(), winston.format.simple())}),
      new winston.transports.File({ filename: '../logfile.log' }),
      // new winston.transports.MongoDB( { level: 'error', db: 'mongodb://localhost/vidly' } )
    ]
  });

module.exports = logger;
