const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  
  logger.error(`Error [${status}]: ${message}`, {
    path: req.path,
    method: req.method,
    stack: err.stack
  });
  
  res.status(status).json({
    error: message,
    status,
    timestamp: new Date().toISOString(),
    path: req.path
  });
};

module.exports = errorHandler;
