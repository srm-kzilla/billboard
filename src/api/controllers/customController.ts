import logger from '../../loaders/logger';
import { writeNewImage } from '../../utilities/imageFileHandler';

export const customRequestConfigGeneration = async (fileName: string, fileData: Buffer): Promise<string> => {
  try {
    return await writeNewImage(fileData, fileName);
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
