import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from 'src/books/entities/book.entity';
import databaseConfig from 'src/common/config/database.config';
import { BookSeedService } from './book-seed.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const options = configService.get('database');
        console.log(options);

        return options;
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([BookEntity]),
  ],

  providers: [BookSeedService],
})
export class SeedModule {}
