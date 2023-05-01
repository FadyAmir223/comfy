import users from './users.mongo.js';

/*
 .create(user); // insert

 .fine({ filter_prop: val | regex | $gte },
  'include_field -execlude_field')

  .update
  .updateOne({ filter_prop: val }, data, { upsert: true })
  // if not exist create
*/

const user = {
  id: '23',
  displayName: 'fezza',
};

const saveUser = async (/*_user*/) => {
  // await users.create(user); // insert
  await users.updateOne(user, user, { upsert: true });
};

const getUser = async () => {
  return await users.find({ id: '23' }, '-_id -__v');
};

const getUsers = async () => {
  return await users.find({});
};

export { saveUser, getUser, getUsers };
