import { Module } from '@nestjs/common';
import { BookLoansService } from './book-loans.service';

@Module({
  providers: [BookLoansService],
})
export class BookLoansModule {}
