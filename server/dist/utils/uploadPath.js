import { existsSync, mkdirSync } from 'fs';
const uploadPath = 'upload/';
if (!existsSync(uploadPath))
    mkdirSync(uploadPath);
export default uploadPath;
