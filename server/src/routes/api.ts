import express from 'express';

import imageRoute from './imageUpload/imageUpload.js';

const api = express.Router();

api.use('/image', imageRoute);

export default api;
