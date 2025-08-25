// main.ts
import { NestFactory } from '@nestjs/core';
import { createAppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

async function bootstrap() {
  const AppModule = await createAppModule();
  const server = express();

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.enableCors();

  await app.listen(process.env.PORT ?? 3001);
  console.log(`🚀 AdminJS: http://localhost:${process.env.PORT ?? 3001}/admin`);
}
bootstrap();
