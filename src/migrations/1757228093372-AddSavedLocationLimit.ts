import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSavedLocationLimit1757228093372 implements MigrationInterface {
    name = 'AddSavedLocationLimit1757228093372'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD "locations_limit" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP COLUMN "locations_limit"`);
    }

}
