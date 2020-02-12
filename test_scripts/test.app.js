/**
 * third party libraries
 */
import bodyParser from 'body-parser';
import express from 'express';
import http from 'http';
import cors from 'cors';

/**
 * server configuration
 */
import config from '../config';
import routes from '../routes';
import error from '../config/errors';

/**
 * express application
 */
const app = express();
const server = http.Server(app);

// allow cross origin requests
// configure to only allow requests from certain origins
app.use(cors({ credentials: true, origin: true }));

// parsing the request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// mount all routes on root /api/v1 path
app.use('/api/v1', routes);

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

// opens a port if the environment is not test
server.listen(config.port, () => {});

export default app;
