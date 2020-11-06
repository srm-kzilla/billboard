import { Router, Request, Response } from 'express';

export default (): Router => {
  const app = Router();

  app.get('/:template', templateHandler);
  app.post('/:template', customTemplateHandler);

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

const customTemplateHandler = (req: Request, res: Response) => {
  console.log(req.query.theme);
  console.log(req.query.title);
  console.log(req.query.subtitle);
  console.log(req.query.fontSize);
  console.log(req.query.fileType);
  console.log(req.params.template);
  res.sendStatus(200);
};
