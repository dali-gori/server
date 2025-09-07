import { MigrationInterface, QueryRunner } from "typeorm";

export class ItemDonationsCascade1757157914510 implements MigrationInterface {
    name = 'ItemDonationsCascade1757157914510'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item_donations" DROP CONSTRAINT "FK_07aafca0b2c6bc96b3cf732cc18"`);
        await queryRunner.query(`ALTER TABLE "item_donations" ADD CONSTRAINT "FK_07aafca0b2c6bc96b3cf732cc18" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item_donations" DROP CONSTRAINT "FK_07aafca0b2c6bc96b3cf732cc18"`);
        await queryRunner.query(`ALTER TABLE "item_donations" ADD CONSTRAINT "FK_07aafca0b2c6bc96b3cf732cc18" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
