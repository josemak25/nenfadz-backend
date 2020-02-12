import mongoose from 'mongoose';
import util from 'util';

// config should be imported before importing any other file
import config from '../config';

const debug = require('debug')('nenfadz-backend:app');

// plugin global promise in mongoose
mongoose.Promise = global.Promise;

const { mongoUri, mongooseDebug, env } = config;

// connect to mongo database
mongoose.connect(mongoUri, {
  keepAlive: 1,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

mongoose.connection.on('connected', () => {
  // eslint-disable-next-line no-console
  if (env === 'development') console.log(`CONNECTED to database: successfully`);
});

// print mongoose logs in dev env
if (mongooseDebug) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}
