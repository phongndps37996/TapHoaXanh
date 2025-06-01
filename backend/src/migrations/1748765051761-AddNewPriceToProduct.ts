import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewPriceToProduct1748765051761 implements MigrationInterface {
    name = 'AddNewPriceToProduct1748765051761'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`price\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`price\``);
    }

}
