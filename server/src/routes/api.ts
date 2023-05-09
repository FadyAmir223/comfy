import express from 'express';

import auth from './auth/auth.js';
import imageRoute from './imageUpload/image-upload.route.js';
import fileRoute from './fileUpload/file-upload.route.js';
import mailRoute from './mail/mail.route.js';

const api = express.Router();

api.use('/auth', auth);
api.use('/image', imageRoute);
api.use('/file', fileRoute);
api.use('/mail', mailRoute);

export default api;
