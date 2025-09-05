import { MigrationInterface, QueryRunner } from "typeorm";

export class LocationsWithUsers1757062655826 implements MigrationInterface {
    name = 'LocationsWithUsers1757062655826'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "saved_locations" ADD "user_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phone_number" character varying`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_07f4f725ca756e227aafc8cc576"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_b6bb02f6cd87c7ae80f1bbb9339"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "oper_region_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "subscription_id" DROP NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_355266d32f3a94cbefb8ded887" ON "saved_locations" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "saved_locations" ADD CONSTRAINT "FK_355266d32f3a94cbefb8ded8874" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_b6bb02f6cd87c7ae80f1bbb9339" FOREIGN KEY ("subscription_id") REFERENCES "subscriptions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_07f4f725ca756e227aafc8cc576" FOREIGN KEY ("oper_region_id") REFERENCES "regions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_07f4f725ca756e227aafc8cc576"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_b6bb02f6cd87c7ae80f1bbb9339"`);
        await queryRunner.query(`ALTER TABLE "saved_locations" DROP CONSTRAINT "FK_355266d32f3a94cbefb8ded8874"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_355266d32f3a94cbefb8ded887"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "subscription_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "oper_region_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_b6bb02f6cd87c7ae80f1bbb9339" FOREIGN KEY ("subscription_id") REFERENCES "subscriptions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_07f4f725ca756e227aafc8cc576" FOREIGN KEY ("oper_region_id") REFERENCES "regions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone_number"`);
        await queryRunner.query(`ALTER TABLE "saved_locations" DROP COLUMN "user_id"`);
    }

}
