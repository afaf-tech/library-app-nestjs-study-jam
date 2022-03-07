import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from 'src/books/entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookSeedService {
  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
  ) {}

  async seed(): Promise<void> {
    const book = this.bookRepository.create({
      title: 'Hujan',
      author: 'Tere Liye',
      publisher: 'gramedia',
      description: 'bla bla',
    });

    await this.bookRepository.save(book);
  }
}
