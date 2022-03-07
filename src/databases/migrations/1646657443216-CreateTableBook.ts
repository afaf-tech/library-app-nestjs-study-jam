import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableBook1646657443216 implements MigrationInterface {
  name = 'CreateTableBook1646657443216';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`books\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`author\` varchar(255) NOT NULL, \`publisher\` varchar(255) NOT NULL, \`description\` varchar(1000) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`books\``);
  }
}
