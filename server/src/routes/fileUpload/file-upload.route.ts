import express from 'express';
import multer from 'multer';
import fileController from './file-upload.controller.js';
import uploadPath from '../../utils/uploadPath.js';

const fileRoute = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

fileRoute.post('/', upload.single('file'), fileController.uploadFile);

fileRoute.get('/:filename', fileController.getFileByName);

export default fileRoute;
