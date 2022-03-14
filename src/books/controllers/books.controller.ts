import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseFilters,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RoleEnum } from 'src/common/config/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { BookDto } from '../dtos/create.book.dto';
import { FilterBookDto } from '../dtos/filter.book.dto';
import { BookEntity } from '../entities/book.entity';
import { BooksService } from '../services/books.service';

@UseGuards(RolesGuard)
@Controller('v1/books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Get()
  public async getBooks(
    @Query() filterBookDto: FilterBookDto,
  ): Promise<BookEntity[]> {
    return this.bookService.getBooks(filterBookDto);
  }

  @Roles(RoleEnum.User)
  @Get(':id')
  getOneBook(@Param('id', ParseIntPipe) id: number): Promise<BookEntity> {
    return this.bookService.findOne(id);
  }

  @UseGuards(RolesGuard)
  @Roles(RoleEnum.Admin)
  @Post()
  async createBook(@Body() bodyData: BookDto): Promise<BookEntity> {
    return this.bookService.createBook(bodyData);
  }
}
