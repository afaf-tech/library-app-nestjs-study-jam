import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
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
    let filter: FindManyOptions<BookEntity> = {};
    if (filterBookDto.title) {
      filter = { where: {title: filterBookDto.title} };
    }
    const books = await this.bookRepository.find(filter);

    return books;
  }

  async findOne(id: number): Promise<BookEntity> {
    const book = await this.bookRepository.findOne({
      where:{id}
    });
    if (!book) {
      throw new NotFoundException('book not found');
      // throw new HttpException(
      //   {
      //     status: HttpStatus.FORBIDDEN,
      //     error: 'This is a custom message',
      //   },
      //   HttpStatus.FORBIDDEN,
      // );
    }
    return book;
  }

  createBook(bookData: BookDto): Promise<BookEntity> {
    const bookEntity = this.bookRepository.create(bookData);
    return this.bookRepository.save(bookEntity);
  }
}
