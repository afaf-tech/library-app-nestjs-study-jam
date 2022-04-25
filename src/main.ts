import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'typeorm';
import { AppModule } from './app.module';
import { logger } from './common/middlewares/logger-function.middleware';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  // useContainer(app.select(AppModule), { fallbackOnErrors: true });
  // app.use(logger);

  const port = configService.get('port');
  console.log(port);

  await app.listen(port);
}
bootstrap();
