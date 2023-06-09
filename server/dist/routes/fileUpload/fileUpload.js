import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
const fileRoute = express.Router();
const uploadPath = 'upload/';
if (!fs.existsSync(uploadPath))
    fs.mkdirSync(uploadPath);
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}`);
    },
});
const upload = multer({ storage: storage });
fileRoute.post('/', upload.single('file'), (req, res) => {
    res.status(201).json({ message: 'file uploaded successfully' });
});
fileRoute.get('/:filename', (req, res) => {
    fs.readdir(uploadPath, (error, files) => {
        if (error)
            return res.status(500).json({
                message: 'failed to retrieve file',
                error,
            });
        const matchingFiles = files.filter((file) => file.startsWith(req.params.filename));
        return matchingFiles.length > 0
            ? res.sendFile(path.resolve(uploadPath, matchingFiles[0]))
            : res.status(404).json({ success: false, message: 'file not found' });
    });
});
export default fileRoute;
