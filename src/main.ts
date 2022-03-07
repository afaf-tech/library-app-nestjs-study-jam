import { NestApplicationOptions } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { BooksService } from './books/services/books.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  // const bookService = app.get(BooksService);
  // console.log(bookService);

  const port = configService.get('port');
  console.log(port);

  await app.listen(port);
}
bootstrap();
