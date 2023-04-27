import { join, parse } from 'path';
import { existsSync, mkdirSync } from 'fs';
console.log(parse(process.cwd()));
const { dir, base } = parse(process.cwd()), uploadDir = 'upload/';
const uploadPath = join(dir, base, uploadDir);
if (!existsSync(uploadPath))
    mkdirSync(uploadPath);
export default uploadPath;
