import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import fs from 'fs';
import { resolve } from 'path';

const uploadPath = 'upload/';
const imageRoute = express.Router();
const upload = multer();

imageRoute.post('/', upload.single('image'), async (req, res) => {
  const imageBuffer = req?.file?.buffer;
  if (!imageBuffer) return res.status(500).json({ success: false });
  const username = req.body.filename;
  const newImagePath = `${uploadPath}${username}-${req?.file?.originalname}`;
  if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
  try {
    await sharp(imageBuffer).jpeg({ quality: 80 }).toFile(newImagePath);
    return res.status(201).json({ uploaded: true });
  } catch {
    return res.status(422).json({ uploaded: false });
  }
});

imageRoute.get('/:filename', (req, res) => {
  fs.readdir(uploadPath, (error, files) => {
    if (error)
      return res.status(500).json({
        success: false,
        message: 'Failed to retrieve image',
        error,
      });

    const matchingFiles = files.filter((file) =>
      file.startsWith(req.params.filename)
    );

    return matchingFiles.length > 0
      ? res.sendFile(resolve(uploadPath + matchingFiles[0]))
      : res.status(404).json({ success: false, message: 'Image not found' });
  });
});

export default imageRoute;
