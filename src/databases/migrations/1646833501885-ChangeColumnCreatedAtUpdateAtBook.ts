import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeColumnCreatedAtUpdateAtBook1646833501885
  implements MigrationInterface
{
  name = 'ChangeColumnCreatedAtUpdateAtBook1646833501885';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_58da082103f7e0eacfc37553d3\` ON \`books\``,
    );
    await queryRunner.query(`ALTER TABLE \`books\` DROP COLUMN \`created_at\``);
    await queryRunner.query(`ALTER TABLE \`books\` DROP COLUMN \`updated_at\``);
    await queryRunner.query(
      `ALTER TABLE \`books\` ADD \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`books\` ADD \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`books\` DROP COLUMN \`updatedAt\``);
    await queryRunner.query(`ALTER TABLE \`books\` DROP COLUMN \`createdAt\``);
    await queryRunner.query(
      `ALTER TABLE \`books\` ADD \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`books\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_58da082103f7e0eacfc37553d3\` ON \`books\` (\`bookId\`)`,
    );
  }
}
