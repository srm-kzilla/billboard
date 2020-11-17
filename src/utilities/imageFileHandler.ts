import { promises as fsPromise } from 'fs';
import { v4 as uuidv4 } from 'uuid';

export const writeNewImage = async (data: Buffer, fileName: string): Promise<string> => {
  const file = uuidv4() + fileName;
  await fsPromise.writeFile(file, data);
  return file;
};

export const deleteImage = async (filePath: string): Promise<void> => {
  await fsPromise.unlink(filePath);
};
