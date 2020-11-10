import { Router, Request, Response } from 'express';
import { customFilepathGeneration } from './controllers/customController';
import multer from 'multer';
import { getHtmlCode, getRequiredConfiguration } from '../utilities/sharedUtilities';

const upload = multer({ storage: multer.memoryStorage() });

export default (): Router => {
  const app = Router();

  app.get('/:template', templateHandler);
  app.post('/:template', upload.single('image'), customTemplateHandler);

  return app;
};

const templateHandler = (req: Request, res: Response) => {
  console.log(req.query.theme);
  console.log(req.query.title);
  console.log(req.query.subtitle);
  console.log(req.query.fontSize);
  console.log(req.query.fileType);
  console.log(req.params.template);
  res.sendStatus(200);
};

const customTemplateHandler = async (req: Request, res: Response) => {
  req.query.filePath = await customFilepathGeneration(req.file.originalname, req.file.buffer);
  req.query.custom = 'true';
  await getHtmlCode(await getRequiredConfiguration(req.query));
  res.sendStatus(200);
};
