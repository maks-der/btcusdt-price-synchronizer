import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './services/config.service';


async function bootstrap(): Promise<void> {
  const config = new ConfigService();
  const app = await NestFactory.create(AppModule);
  await app.listen(Number(config.get('PORT')));
}

void bootstrap();
