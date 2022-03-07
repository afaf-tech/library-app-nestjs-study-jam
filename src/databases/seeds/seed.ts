import { NestFactory } from '@nestjs/core';
import { BookSeedService } from './book-seed.service';
import { SeedModule } from './seed.module';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(SeedModule);
  const bookSeeder = appContext.get(BookSeedService);
  await bookSeeder.seed();

  await appContext.close();
}

bootstrap();
