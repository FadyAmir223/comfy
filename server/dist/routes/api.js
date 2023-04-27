import express from 'express';
import imageRoute from './imageUpload/image-upload.route.js';
import fileRoute from './fileUpload/file-upload.route.js';
const api = express.Router();
api.use('/image', imageRoute);
api.use('/file', fileRoute);
export default api;
