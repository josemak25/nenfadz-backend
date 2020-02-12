import fs from 'fs';
import Query from './query';

// get all models from working directory
const directoryPath = `${process.cwd()}/models`;

const AllModels = fs.readdirSync(directoryPath, (err, files) => {
  // eslint-disable-next-line no-console
  if (err) console.log(err);
  return files;
});

// get working models from working directory
const builderObject = AllModels.reduce((accumulator, file) => {
  // if file is test folder then skip
  if (file === '__tests__') return accumulator;

  // get every model from the model folder
  const Model = require(`../models/${file}`);

  // get model name
  const [modelName] = file.split('.');

  // attach query word to every model name
  const queryBuilderName = `${modelName
    .charAt(0)
    .toUpperCase()}${modelName.slice(1)}Query`;

  // sync model to general query methods
  const ModelQuery = new Query(Model);

  // attach synced model to accumulator
  accumulator[queryBuilderName] = ModelQuery;
  return accumulator;
}, {});

/**
 * all models created in models folder would be required here on start
 * and converted for query usage
 * NOTE --- All models would be export from here after dynamically synching to the general query builder
 * NOTE --- Each model query after sync is named after the model name with a suffix of Query attached to it
 * EXAMPLE --- user.model turns to UserQuery
 * @param {QueryModel} UserQuery - and example of user query model for usage
 * @param {UserQuery} UserQuery.findAll({})
 * @returns {[userInstance]} - an array of user document returned from the user collection table
 */

// export synched model for use on controller
module.exports = builderObject;
