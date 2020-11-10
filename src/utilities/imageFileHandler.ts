import { writeFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import logger from '../loaders/logger';

export const writeNewImage = async (data: Buffer, fileName: string): Promise<string> => {
  try {
    const file = uuidv4() + fileName;
    await writeFile(file, data);
    return file;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
