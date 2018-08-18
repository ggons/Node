const config = require('config');
const debug = require('debug')('app:startup');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const express = require('express');
const app = express();
const logger = require('./middleware/logger');
const routes = require('./routes');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()); // req.body
app.use(express.urlencoded({ extended: true })); // key=value&key=value
app.use(express.static('public'));
app.use(helmet());
app.use('/', routes);

// Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('Morgan enabled...'); // console.log()
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

