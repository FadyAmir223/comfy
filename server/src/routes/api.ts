import express from 'express';

import imageRoute from './imageUpload/imageUpload.js';
import fileRoute from './fileUpload/fileUpload.js';

const api = express.Router();

api.use('/image', imageRoute);
api.use('/file', fileRoute);

export default api;
