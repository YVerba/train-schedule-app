import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors();

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  console.log(`Server running on PORT: ${PORT}`);
}
bootstrap();
