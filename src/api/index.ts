import { Router, Request, Response, NextFunction } from 'express';
import expressRateLimit from 'express-rate-limit';
import { customFilepathGeneration, requestController } from './controllers/requestController';
import multer, { MulterError } from 'multer';
import { getRequiredConfiguration } from '../utilities/sharedUtilities';
import { IncomingConfiguration } from '../types/customTypes';
import { validateQuery } from './middlewares/queryValidation';

const rateLimiterGet = expressRateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30,
  message: 'You are limited to 30 images per minute.',
});

const rateLimiterPost = expressRateLimit({
  windowMs: 1 * 60 * 1000,
  max: 20,
  message: 'You are limited to 20 custom OG images per minute.',
});

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: function (req, file, cb) {
    const filter = ['image/png', 'image/jpeg', 'image/gif'];
    if (filter.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported media type'));
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

export default (): Router => {
  const app = Router();

  app.get('/blog', rateLimiterGet, validateQuery, templateHandler);
  app.post('/custom', rateLimiterPost, validateQuery, upload.single('image'), customTemplateHandler);
  app.use(errorHandler);

  return app;
};

const templateHandler = async (req: Request, res: Response) => {
  const unparsedConfig: IncomingConfiguration = { ...req.query };
  const file = await requestController(await getRequiredConfiguration(unparsedConfig));
  res.setHeader('Content-Type', `image/${req.query.fileType ? req.query.fileType : 'png'}`);
  res.end(file);
};

const customTemplateHandler = async (req: Request, res: Response) => {
  if (req.file === undefined) {
    return res.status(500).json({ success: false, messsage: 'Must have an image file' });
  }
  try {
    const unparsedConfig: IncomingConfiguration = { ...req.query };
    unparsedConfig.filePath = await customFilepathGeneration(req.file.originalname, req.file.buffer);
    unparsedConfig.custom = true;
    const file = await requestController(await getRequiredConfiguration(unparsedConfig));
    res.setHeader('Content-Type', `image/${unparsedConfig.fileType ? unparsedConfig.fileType : 'png'}`);
    res.end(file);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  let newError: Error = null;
  if (err instanceof MulterError || err.message === 'Unsupported media type') newError = err;
  else newError = new Error('Internal Server Error');
  res.status(500).json({ success: false, messsage: newError.message });
  next();
};
