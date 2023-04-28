import express from 'express';

import imageRoute from './imageUpload/image-upload.route.js';
import fileRoute from './fileUpload/file-upload.route.js';
import auth from './auth/auth.js';

const api = express.Router();

api.use('/auth', auth);
api.use('/image', imageRoute);
api.use('/file', fileRoute);

export default api;
