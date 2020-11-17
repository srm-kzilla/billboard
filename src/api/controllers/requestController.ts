import logger from '../../loaders/logger';
import { RequestConfiguration } from '../../types/customTypes';
import { writeNewImage } from '../../utilities/imageFileHandler';
import { getHtmlCode } from '../../utilities/sharedUtilities';

export const customFilepathGeneration = async (fileName: string, fileData: Buffer): Promise<string> => {
  try {
    return await writeNewImage(fileData, fileName);
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

export const requestController = async (config: RequestConfiguration): Promise<void> => {
  await getHtmlCode(config);
};
