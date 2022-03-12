import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseFilters,
  ValidationPipe,
} from '@nestjs/common';
import { BookDto } from '../dtos/create.book.dto';
import { FilterBookDto } from '../dtos/filter.book.dto';
import { BookEntity } from '../entities/book.entity';
import { BooksService } from '../services/books.service';

@Controller('v1/books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Get()
  public async getBooks(
    @Query() filterBookDto: FilterBookDto,
  ): Promise<BookEntity[]> {
    return this.bookService.getBooks(filterBookDto);
  }

  @Get(':id')
  getOneBook(@Param('id', ParseIntPipe) id: number): Promise<BookEntity> {
    return this.bookService.findOne(id);
  }

  @Post()
  async createBook(@Body() bodyData: BookDto): Promise<BookEntity> {
    return this.bookService.createBook(bodyData);
  }
}
