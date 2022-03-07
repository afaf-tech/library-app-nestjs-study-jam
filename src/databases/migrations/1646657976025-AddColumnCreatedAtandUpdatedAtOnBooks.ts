import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnCreatedAtandUpdatedAtOnBooks1646657976025
  implements MigrationInterface
{
  name = 'AddColumnCreatedAtandUpdatedAtOnBooks1646657976025';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`books\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`books\` ADD \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`books\` DROP COLUMN \`updated_at\``);
    await queryRunner.query(`ALTER TABLE \`books\` DROP COLUMN \`created_at\``);
  }
}
