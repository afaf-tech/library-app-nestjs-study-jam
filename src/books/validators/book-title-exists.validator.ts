import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Repository } from 'typeorm';
import { BookEntity } from '../entities/book.entity';

@ValidatorConstraint({ name: 'UniqueBookTitle', async: true })
@Injectable()
export class UniqueBookTitle implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
  ) {}

  async validate(value: string) {
    const book = await this.bookRepository.findOne({ where: { title: value } });
    console.log(book);

    if (book) return false;

    return true;
  }

  defaultMessage(args?: ValidationArguments): string {
    return `title for ${args.property} is exist, try for another book title name`;
  }
}
