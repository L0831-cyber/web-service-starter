const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3
};

const currentLevel = levels[process.env.LOG_LEVEL || 'info'];

const log = (level, message, data = {}) => {
  const timestamp = new Date().toISOString();
  const logLevel = level.toUpperCase();
  
  const output = {
    timestamp,
    level: logLevel,
    message,
    ...data
  };
  
  if (levels[level] <= currentLevel) {
    if (level === 'error') {
      console.error(JSON.stringify(output));
    } else {
      console.log(JSON.stringify(output));
    }
  }
};

module.exports = {
  error: (message, data) => log('error', message, data),
  warn: (message, data) => log('warn', message, data),
  info: (message, data) => log('info', message, data),
  debug: (message, data) => log('debug', message, data)
};
