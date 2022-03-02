import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from './controllers/books.controller';
import { BookEntity } from './entities/book.entity';
import { BooksService } from './services/books.service';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
