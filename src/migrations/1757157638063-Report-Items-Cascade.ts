import { MigrationInterface, QueryRunner } from "typeorm";

export class ReportItemsCascade1757157638063 implements MigrationInterface {
    name = 'ReportItemsCascade1757157638063'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "FK_4fc6a857e164a777543d640a5cf"`);
        await queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "FK_4fc6a857e164a777543d640a5cf" FOREIGN KEY ("report_id") REFERENCES "reports"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "FK_4fc6a857e164a777543d640a5cf"`);
        await queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "FK_4fc6a857e164a777543d640a5cf" FOREIGN KEY ("report_id") REFERENCES "reports"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
