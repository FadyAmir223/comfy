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
const updateUserAccessToken = async (id, accessToken) => {
    await User.updateOne({ id }, { $set: { accessToken: accessToken } });
};
export { findOrCreateUser, getUser, getUsers, updateUserAccessToken };
