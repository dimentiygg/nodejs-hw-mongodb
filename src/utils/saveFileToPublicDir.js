import fs from 'node:fs/promises';
import path from 'node:path';
import { TEMP_PUBLIC_DIR } from '../constants/constants.js';

const saveFileToPublicDir = async (file, filePath) => {
  const newPath = path.join(TEMP_PUBLIC_DIR, filePath, file.filename);
  await fs.rename(file.path, newPath);
  return `/${filePath}/${file.filename}`;
};

export default saveFileToPublicDir;
