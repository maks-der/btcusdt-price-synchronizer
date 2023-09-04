import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';



async function bootstrap(): Promise<void> {
  config();
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.APP_PORT);
}

void bootstrap();
