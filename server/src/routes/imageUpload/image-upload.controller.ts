import sharp from 'sharp';
import { resolve } from 'path';
import { readdir } from 'fs';
import uploadPath from '../../utils/uploadPath.js';

const handleUploadImage = async (req, res) => {
  const imageBuffer = req?.file?.buffer;
  if (!imageBuffer) return res.status(500).json({ success: false });
  const newImagePath = uploadPath + req?.file?.originalname;
  try {
    await sharp(imageBuffer).jpeg({ quality: 80 }).toFile(newImagePath);
    return res.status(201).json({ message: 'image uploaded successfully' });
  } catch {
    return res.status(422).json({ message: "image didn't upload" });
  }
};

const handleGetImageByName = (req, res) => {
  readdir(uploadPath, (error, files) => {
    if (error)
      return res.status(500).json({
        message: 'failed to retrieve image',
        error,
      });

    const matchingFiles = files.filter((file) =>
      file.startsWith(req.params.filename)
    );

    return matchingFiles.length > 0
      ? res.sendFile(resolve(uploadPath + matchingFiles[0]))
      : res.status(404).json({ success: false, message: 'image not found' });
  });
};

export { handleUploadImage, handleGetImageByName };
