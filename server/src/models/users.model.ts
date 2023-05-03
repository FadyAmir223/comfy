import users from './users.mongo.js';

/*
 .create(user); // insert

 .fine({ filter_prop: val | regex | $gte },
  'include_field -execlude_field')

  .update
  .updateOne({ filter_prop: val }, data, { upsert: true })
  // if not exist create
*/

const findOrCreateUser = async (user) => {
  return await users.findOneAndUpdate({ id: user.id }, user, { upsert: true });
};

const getUser = async (id) => {
  return await users.find({ id }, '-_id -__v');
};

const getUsers = async () => {
  return await users.find();
};

export { findOrCreateUser, getUser, getUsers };
