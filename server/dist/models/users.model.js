import users from './users.mongo.js';
const user = {
    id: '23',
    displayName: 'fezza',
};
const saveUser = async () => {
    await users.updateOne(user, user, { upsert: true });
};
const getUser = async () => {
    return await users.find({ id: '23' }, '-_id -__v');
};
const getUsers = async () => {
    return await users.find({});
};
export { saveUser, getUser, getUsers };
