import { Test, TestingModule } from '@nestjs/testing';
import { Books } from './books';

describe('Books', () => {
  let provider: Books;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Books],
    }).compile();

    provider = module.get<Books>(Books);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
