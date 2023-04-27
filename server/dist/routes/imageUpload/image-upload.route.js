import express from 'express';
import multer from 'multer';
import { handleUploadImage, handleGetImageByName, } from './image-upload.controller.js';
const upload = multer();
const imageRoute = express.Router();
imageRoute.post('/', upload.single('image'), handleUploadImage);
imageRoute.get('/:filename', handleGetImageByName);
export default imageRoute;
