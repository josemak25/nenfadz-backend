/**
 * Generic query builder for all models int the app
 * NOTE --- Each model is attached to the query general query class for all CRUD operations
 * EXAMPLE --- user.model turns to UserQuery
 * @param {Query} Query(UserModel) - after synching user model turn to UserQuery which is ready for all custom CRUD operations
 * @returns {QueryBuilder} - a query builder object for calling all CRUD operations no matter the model
 */

class Query {
  constructor(Model) {
    this.Model = Model;
  }

  create(payload) {
    return this.Model.create(payload);
  }

  findOne(payload) {
    return this.Model.findOne(payload).exec();
  }

  findAll(payload) {
    return this.Model.find(payload);
  }

  update({ payload, where }) {
    return this.Model.findOneAndUpdate(where, payload, { new: true }).exec();
  }

  delete(payload) {
    return this.Model.findOneAndDelete(payload).exec();
  }
}

export default Query;
