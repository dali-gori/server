import { MigrationInterface, QueryRunner } from "typeorm";

export class ReportRadius1757159410681 implements MigrationInterface {
    name = 'ReportRadius1757159410681'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reports" ADD "radius" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reports" DROP COLUMN "radius"`);
    }

}
