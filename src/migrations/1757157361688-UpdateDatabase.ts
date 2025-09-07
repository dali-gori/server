import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDatabase1757157361688 implements MigrationInterface {
    name = 'UpdateDatabase1757157361688'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "status_history" DROP CONSTRAINT "FK_14e6286c240e97be1402ea4105c"`);
        await queryRunner.query(`ALTER TABLE "status_history" ADD CONSTRAINT "FK_14e6286c240e97be1402ea4105c" FOREIGN KEY ("report_id") REFERENCES "reports"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "status_history" DROP CONSTRAINT "FK_14e6286c240e97be1402ea4105c"`);
        await queryRunner.query(`ALTER TABLE "status_history" ADD CONSTRAINT "FK_14e6286c240e97be1402ea4105c" FOREIGN KEY ("report_id") REFERENCES "reports"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
