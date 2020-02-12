/**
 *  start database connection
 */
import './database';

import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import http from 'http';
import cors from 'cors';
import logger from 'morgan';
import cookieParser from 'cookie-parser';

/**
 * server configuration
 */
import config from './config';
import routes from './routes';
import * as error from './config/errors';

/**
 * express application
 */
const app = express();
const server = http.Server(app);

// secure apps by setting various HTTP headers

app.use(
  helmet({
    dnsPrefetchControl: false,
    frameguard: false,
    ieNoOpen: false
  })
);

// allow cross origin requests
// configure to only allow requests from certain origins
app.use(cors({ credentials: true, origin: true }));

app.use(cookieParser());

// parsing the request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// enable detailed API logging in dev env
if (config.env === 'development') {
  app.use(logger('dev'));
}

// mount all routes on root /api/v1 path
app.use('/api/v1', routes);

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

// opens a port if the environment is not test
server.listen(config.port, () => {
  if (config.env === 'development') {
    // eslint-disable-next-line no-console
    console.info(`server started on port ${config.port} (${config.env})`);
  }
});
