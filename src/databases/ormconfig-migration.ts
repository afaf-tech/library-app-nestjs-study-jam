import { BookDetailEntity } from 'src/books/entities/book-detail.entity';
import { BookEntity } from 'src/books/entities/book.entity';
import databaseConfig from 'src/common/config/database.config';

module.exports = {
  host: databaseConfig().host,
  type: 'mysql',
  port: databaseConfig().port,
  username: databaseConfig().username,
  password: databaseConfig().password,
  database: databaseConfig().database,
  syncronize: false,
  entities: databaseConfig().entities,
  migrations: ['src/databases/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/databases/migrations',
  },
};
