import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Repository } from 'typeorm';
import { BookEntity } from '../entities/book.entity';

@ValidatorConstraint({ name: 'BookTitleExist', async: true })
@Injectable()
export class BookTitleExistRule implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
  ) {}

  async validate(value: string) {
    console.log(value);
    console.log(this.bookRepository);
    const book = await this.bookRepository.findOne({ where: { title: value } });
    if (book) return false;

    return true;
  }

  defaultMessage(args?: ValidationArguments): string {
    return `title for ${args.property} is exist, try for another book title name`;
  }
}
