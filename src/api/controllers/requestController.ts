import path from 'path';
import logger from '../../loaders/logger';
import { RequestConfiguration } from '../../types/customTypes';
import { deleteImage, writeNewImage } from '../../utilities/imageFileHandler';
import { getScreenshot } from '../../utilities/sharedUtilities';

export const customFilepathGeneration = async (fileName: string, fileData: Buffer): Promise<string> => {
  try {
    return path.join(__dirname, '..', '..', '..', await writeNewImage(fileData, fileName));
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

export const requestController = async (config: RequestConfiguration): Promise<Buffer> => {
  try {
    const screenshotBuffer = await getScreenshot(config);
    if (config.custom) {
      await deleteImage(config.template);
    }
    return screenshotBuffer;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
