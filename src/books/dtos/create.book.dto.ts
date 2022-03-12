import { Expose, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

export class BookDetailDto {
  @IsNotEmpty()
  price: number;
}
export class BookDto {
  @IsString()
  @MaxLength(10)
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
