import { Router, Request, Response } from 'express';
import { customFilepathGeneration, requestController } from './controllers/requestController';
import multer from 'multer';
import { getRequiredConfiguration } from '../utilities/sharedUtilities';

const upload = multer({ storage: multer.memoryStorage() });

export default (): Router => {
  const app = Router();

  app.get('/:template', templateHandler);
  app.post('/custom', upload.single('image'), customTemplateHandler);

  return app;
};

const templateHandler = async (req: Request, res: Response) => {
  const file = await requestController(await getRequiredConfiguration(req.query));
  res.setHeader('Content-Type', `image/${req.query.fileType ? req.query.fileType : 'png'}`);
  res.end(file);
};

const customTemplateHandler = async (req: Request, res: Response) => {
  req.query.filePath = await customFilepathGeneration(req.file.originalname, req.file.buffer);
  req.query.custom = 'true';
  const file = await requestController(await getRequiredConfiguration(req.query));
  res.setHeader('Content-Type', `image/${req.query.fileType ? req.query.fileType : 'png'}`);
  res.end(file);
};
