import express from './express';
import Logger from './logger';
import Express from 'express';

export default async ({ expressApp }: { expressApp: Express.Application }): Promise<void> => {
  //await database();
  //Logger.info(`✌️ Connection to database successful: ${config.databaseURL}`);

  await express({ app: expressApp });
  Logger.info('✌️ Express loaded');

  Logger.info('✅ All modules loaded!');
};
