import fs from 'fs';
import path from 'path';
import uploadPath from '../../utils/uploadPath.js';

function uploadFile(req, res) {
  res.status(201).json({ message: 'file uploaded successfully' });
}

function getFileByName(req, res) {
  fs.readdir(uploadPath, (error, files) => {
    if (error)
      return res.status(500).json({
        message: 'failed to retrieve file',
        error,
      });

    const matchingFiles = files.filter((file) =>
      file.startsWith(req.params.filename)
    );

    return matchingFiles.length > 0
      ? res.sendFile(path.resolve(uploadPath, matchingFiles[0]))
      : res.status(404).json({ success: false, message: 'file not found' });
  });
}

export default {
  uploadFile,
  getFileByName,
};
