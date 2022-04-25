import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from './controllers/books.controller';
import { BookEntity } from './entities/book.entity';
import { BooksService } from './services/books.service';
import { BookTitleExistRule } from './validators/book-title-exists.validator';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity])],
  controllers: [BooksController],
  providers: [BooksService, BookTitleExistRule],
})
export class BooksModule {}
