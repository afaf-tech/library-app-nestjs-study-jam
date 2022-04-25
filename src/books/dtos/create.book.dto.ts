import { Expose, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  Validate,
  ValidateNested,
} from 'class-validator';
import { BookTitleExistRule } from '../validators/book-title-exists.validator';

export class BookDetailDto {
  @IsNotEmpty()
  price: number;
}
export class BookDto {
  @IsString()
  @MaxLength(10)
  @Validate(BookTitleExistRule)
  title: string;

  description: string;
  author: string;

  publisher: string;

  @IsNotEmpty()
  qty: number;

  @IsNotEmpty()
  @Expose({ name: 'year_of_publication' })
  yearOfPublication: number;

  @Expose({ name: 'book_detail' })
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => BookDetailDto)
  bookDetail: BookDetailDto;
}
