import users from './users.mongo.js';
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
