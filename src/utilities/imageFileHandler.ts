import { promises as fsPromise } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import logger from '../loaders/logger';

export const writeNewImage = async (data: Buffer, fileName: string): Promise<string> => {
  try {
    const file = uuidv4() + fileName;
    await fsPromise.writeFile(file, data);
    return file;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
