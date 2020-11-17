import { Router, Request, Response } from 'express';
import { customFilepathGeneration, requestController } from './controllers/requestController';
import multer, { MulterError } from 'multer';
import { getRequiredConfiguration } from '../utilities/sharedUtilities';

const upload = multer({ storage: multer.memoryStorage() });

export default (): Router => {
  const app = Router();

  app.get('/:template', templateHandler);
  app.post('/custom', upload.single('image'), customTemplateHandler);
  app.use(errorHandler);

  return app;
};

const templateHandler = async (req: Request, res: Response) => {
  const file = await requestController(await getRequiredConfiguration(req.query));
  res.setHeader('Content-Type', `image/${req.query.fileType ? req.query.fileType : 'png'}`);
  res.end(file);
};

const customTemplateHandler = async (req: Request, res: Response) => {
  if (req.file === undefined) {
    return res.status(500).json({ success: false, messsage: 'Must have an image file' });
  }
  try {
    req.query.filePath = await customFilepathGeneration(req.file.originalname, req.file.buffer);
    req.query.custom = 'true';
    const file = await requestController(await getRequiredConfiguration(req.query));
    res.setHeader('Content-Type', `image/${req.query.fileType ? req.query.fileType : 'png'}`);
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
