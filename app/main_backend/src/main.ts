require('dotenv').config({ path: '.env' });

import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

import { Request, Response } from 'express';

import * as express from 'express';
import * as bodyParser from 'body-parser';

const port = process.env.NODE_SERVER_PORT || 8081;
const logger: Logger = new Logger('NestApplication');

async function bootstrap() {

  const appOptions = { cors: true };
  const app = await NestFactory.create(AppModule, appOptions);


  app.use('/arquivos', express.static('arquivos'));
  app.use('/assets', express.static('client/public/assets'));
  app.use('/css', express.static('client/public/css'));
  app.use('/fonts', express.static('client/public/fonts'));
  app.use('/js', express.static('srclient/public/js'));
  app.use('/locales', express.static('client/public/locales'));

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  
  app.enableCors();
  app.use((req: Request, res: Response, next: Function) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  await app.listen(port);
  logger.log(`Application listening on port http://localhost:${port}`);
}
bootstrap();
