import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableBookDetail1646658738124 implements MigrationInterface {
  name = 'CreateTableBookDetail1646658738124';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`book_details\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quantity\` varchar(255) NOT NULL, \`price\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`profileId\` int NULL, UNIQUE INDEX \`REL_f1e19627622c13388518cc3237\` (\`profileId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`ALTER TABLE \`books\` ADD \`bookId\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`books\` ADD UNIQUE INDEX \`IDX_58da082103f7e0eacfc37553d3\` (\`bookId\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_58da082103f7e0eacfc37553d3\` ON \`books\` (\`bookId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`books\` ADD CONSTRAINT \`FK_58da082103f7e0eacfc37553d32\` FOREIGN KEY (\`bookId\`) REFERENCES \`book_details\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`book_details\` ADD CONSTRAINT \`FK_f1e19627622c13388518cc32375\` FOREIGN KEY (\`profileId\`) REFERENCES \`books\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`book_details\` DROP FOREIGN KEY \`FK_f1e19627622c13388518cc32375\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`books\` DROP FOREIGN KEY \`FK_58da082103f7e0eacfc37553d32\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_58da082103f7e0eacfc37553d3\` ON \`books\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`books\` DROP INDEX \`IDX_58da082103f7e0eacfc37553d3\``,
    );
    await queryRunner.query(`ALTER TABLE \`books\` DROP COLUMN \`bookId\``);
    await queryRunner.query(
      `DROP INDEX \`REL_f1e19627622c13388518cc3237\` ON \`book_details\``,
    );
    await queryRunner.query(`DROP TABLE \`book_details\``);
  }
}
