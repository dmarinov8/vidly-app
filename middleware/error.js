const logger = require('./logger');

module.exports = function(err, req, res, next) {
    logger.error(err.message); // Log the exception; Levels: error, warn, info, verbose, debug, silly

    res.status(err.status || 500).send('Something failed.');
}