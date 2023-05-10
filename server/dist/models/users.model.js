import User from './users.mongo.js';
const findOrCreateUser = async (user) => {
    return await User.findOneAndUpdate({ id: user.id }, user, { upsert: true });
};
const getUser = async (id) => {
    return await User.findOne({ id }, '-_id -__v');
};
const getUsers = async () => {
    return await User.find({}, '-_id -__v');
};
const updateUser = async (user) => {
    const { id, ...data } = user;
    await User.updateOne({ id }, { $set: data });
};
export { findOrCreateUser, getUser, getUsers, updateUser };
