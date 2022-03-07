import { Test, TestingModule } from '@nestjs/testing';
import { BookLoansService } from './book-loans.service';

describe('BookLoansService', () => {
  let service: BookLoansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookLoansService],
    }).compile();

    service = module.get<BookLoansService>(BookLoansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
