import { Router, Request, Response } from 'express';
import { customFilepathGeneration, requestController } from './controllers/requestController';
import multer, { MulterError } from 'multer';
import { getRequiredConfiguration } from '../utilities/sharedUtilities';
import { IncomingConfiguration } from '../types/customTypes';

const upload = multer({ storage: multer.memoryStorage() });

export default (): Router => {
  const app = Router();

  app.get('/:template', templateHandler);
  app.post('/custom', upload.single('image'), customTemplateHandler);
  app.use(errorHandler);

  return app;
};

const templateHandler = async (req: Request, res: Response) => {
<<<<<<< HEAD
  const file = await requestController(await getRequiredConfiguration(req.query));
=======
  const unparsedConfig: IncomingConfiguration = { ...req.query };
  const file = await requestController(await getRequiredConfiguration(unparsedConfig));
>>>>>>> 7a86bd2d6772fbfd1cbddbedbf51225ae3feef6a
  res.setHeader('Content-Type', `image/${req.query.fileType ? req.query.fileType : 'png'}`);
  res.end(file);
};

const customTemplateHandler = async (req: Request, res: Response) => {
  if (req.file === undefined) {
    return res.status(500).json({ success: false, messsage: 'Must have an image file' });
  }
  try {
<<<<<<< HEAD
    req.query.filePath = await customFilepathGeneration(req.file.originalname, req.file.buffer);
    req.query.custom = 'true';
    const file = await requestController(await getRequiredConfiguration(req.query));
    res.setHeader('Content-Type', `image/${req.query.fileType ? req.query.fileType : 'png'}`);
=======
    const unparsedConfig: IncomingConfiguration = { ...req.query };
    unparsedConfig.filePath = await customFilepathGeneration(req.file.originalname, req.file.buffer);
    unparsedConfig.custom = true;
    const file = await requestController(await getRequiredConfiguration(unparsedConfig));
    res.setHeader('Content-Type', `image/${unparsedConfig.fileType ? unparsedConfig.fileType : 'png'}`);
>>>>>>> 7a86bd2d6772fbfd1cbddbedbf51225ae3feef6a
    res.end(file);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const errorHandler = (err: Error, req: Request, res: Response) => {
  console.error(err);
  let newError = Error('Internal Server Error');
  if (err instanceof MulterError) {
    newError = Error('File could not be handled');
  }
  res.status(500).json({ success: false, messsage: newError.message });
};
