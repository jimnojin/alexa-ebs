
const express  = require('express');
const http = require('http');

const configure = require('./express/configure');
const log = require('./utils/logger');
const config = require('./config');

const app = express();

app.start = async () => {
  log.info('Starting Server...');

  app.set('port', config.port);

  configure(app);

  const server = http.createServer(app);

  server.on('error', error => {
    if (error.syscall !== 'listen') throw error;
    log.error(`Failed to start server: ${error}`);
    process.exit(1);
  });

  server.on('listening', () => {
    const address = server.address();
    log.info(`Server listening ${address.address}:${address.port}`);
  });

  server.listen(config.port);
};

app.start().catch((err) => {
  log.error(err);
});

module.exports = app;
