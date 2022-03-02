import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Repository } from 'typeorm';
import { BookEntity } from '../entities/book.entity';
import { BookDto } from '../dtos/create.book.dto';
import { FilterBookDto } from '../dtos/filter.book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
  ) {}

  async getBooks(filterBookDto: FilterBookDto): Promise<BookEntity[]> {
    let filter: FindConditions<BookEntity> = {};
    if (filterBookDto.title) {
      filter = { title: filterBookDto.title };
    }
    const books = await this.bookRepository.find(filter);

    return books;
  }

  async findOne(id: number): Promise<BookEntity> {
    return this.bookRepository.findOne(id);
  }

  createBook(bookData: BookDto): Promise<BookEntity> {
    const bookEntity = this.bookRepository.create(bookData);
    return this.bookRepository.save(bookData);
  }
}
