import { promises as fsPromise } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export const writeNewImage = async (data: Buffer, fileName: string): Promise<string> => {
  const file = uuidv4() + fileName;
  await fsPromise.writeFile(join(__dirname, '..', 'assets', file), data);
  return file;
};

export const deleteImage = async (filePath: string): Promise<void> => {
  await fsPromise.unlink(join(__dirname, '..', 'assets', filePath));
};
