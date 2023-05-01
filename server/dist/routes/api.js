import express from 'express';
import imageRoute from './imageUpload/image-upload.route.js';
import fileRoute from './fileUpload/file-upload.route.js';
import auth from './auth/auth.js';
import { getUser, saveUser } from '../models/users.model.js';
const api = express.Router();
api.use('/auth', auth);
api.use('/image', imageRoute);
api.use('/file', fileRoute);
api.get('/test', async (req, res) => {
    await saveUser();
    const user = await getUser();
    console.log('user', user);
    return res.status(200).json(user);
});
export default api;
