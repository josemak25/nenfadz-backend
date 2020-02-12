/* eslint-disable no-return-await */
import '@babel/polyfill';
import mongoose from 'mongoose';
import config from '../config';

// plugin global promise in mongoose
mongoose.Promise = global.Promise;

/** * Connect to the test database. */
const connectDB = () => {
  mongoose.connect(config.mongoUri, {
    keepAlive: 1,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });
};

/** * Drop database, close the connection and stop mongodb. */
const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};

/** * Remove all the data for all db collections. */
const clearDatabase = async () => {
  const { collections } = mongoose.connection;
  // eslint-disable-next-line no-restricted-syntax
  for (const key in collections) {
    // eslint-disable-next-line no-prototype-builtins
    if (collections.hasOwnProperty(key)) {
      const collection = collections[key];
      collection.deleteMany();
    }
  }
};

/** * Connect to a new in-memory database before running any tests. */

beforeAll(() => connectDB());

/** * Clear all test data after every test. */

afterEach(async () => await clearDatabase());

/** * Remove and close the db and server. */

afterAll(async () => await closeDatabase());
