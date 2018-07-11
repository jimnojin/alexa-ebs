
const bodyParser = require('body-parser');

const log = require('../utils/logger');
// const routes = require('./routes');

module.exports = function configure(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Routes
  // app.use(routes);

  // 404
  app.use((req, res) => {
    log.info(`404 - ${req.originalUrl}`);

    res.status(404).send({
      status: 404,
      message: 'The requested resource was not found',
    });
  });

  // 5xx
  app.use((err, req, res) => {
    log.error(err.stack);
    const message = process.env.NODE_ENV === 'production'
      ? 'Something went wrong, we\'re looking into it...'
      : err.stack;
      
    res.status(500).send({
      status: 500,
      message,
    });
  });
}