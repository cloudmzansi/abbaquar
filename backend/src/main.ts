import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AuthMiddleware } from './auth.middleware';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  });

  // Serve static files from /public/uploads as /assets
  app.use('/assets', express.static(path.join(__dirname, '../../public/uploads')));

  // Enable validation pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.use('/events', AuthMiddleware.prototype.use);
  app.use('/photos', AuthMiddleware.prototype.use);
  app.use('/clear-uploads', AuthMiddleware.prototype.use);
  app.use('/activities', AuthMiddleware.prototype.use);

  await app.listen(3000);
}
bootstrap(); 