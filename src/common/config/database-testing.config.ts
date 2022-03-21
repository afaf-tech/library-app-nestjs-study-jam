import { registerAs } from '@nestjs/config';
import { BookDetailEntity } from 'src/books/entities/book-detail.entity';
import { BookEntity } from 'src/books/entities/book.entity';
import { UserEntity } from 'src/users/entities/user.entity';

export default registerAs('databaseTesting', () => ({
  type: 'mysql',
  host: process.env.DATABASE_TEST_HOST,
  port: process.env.DATABASE_TEST_PORT,
  username: process.env.DATABASE_TEST_USERNAME,
  password: process.env.DATABASE_TEST_PASSWORD,
  database: process.env.DATABASE_TEST_NAME,
  syncronize: false,
  entities: [BookEntity, BookDetailEntity, UserEntity],
}));
