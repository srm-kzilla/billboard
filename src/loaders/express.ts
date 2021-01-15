import bodyParser from 'body-parser';
import { join } from 'path';
import { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import config from '../config';
import routes from '../api';
import logger from './logger';

export default ({ app }: { app: express.Application }): void => {
  /**
   * Health Check endpoints
   */

  app.set('trust proxy', 1);
  app.use('/assets', express.static(join(__dirname, '..', 'assets')));
  app.get('/healthcheck', (req, res) => {
    const healthcheck = {
      uptime: process.uptime(),
      message: 'OK',
      timestamp: Date.now(),
    };
    try {
      return res.json(healthcheck);
    } catch (e) {
      return res.status(503).send();
    }
  });

  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');

  // Serve the static folder for the assets
  app.use(express.static(join(__dirname, '..', 'static')));

  // Middleware that helps secure app by setting headers
  app.use(helmet());

  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());

  app.get('/', (req: Request, res: Response) => {
    res.sendFile(join(__dirname, '..', 'static', 'index.html'));
  });

  // Load API routes
  app.use(config.api.prefix, routes());

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err);
    res.status(500).json({
      code: 500,
      message:
        'Unexpected Server Error. Our best minds are working on this issue right now. Apologies for the inconvinience.',
    });
  });
};
