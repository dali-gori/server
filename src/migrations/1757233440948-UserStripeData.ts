import { MigrationInterface, QueryRunner } from "typeorm";

export class UserStripeData1757233440948 implements MigrationInterface {
    name = 'UserStripeData1757233440948'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "payment_number"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "stripe_customer_id" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "stripe_subscription_id" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "stripe_subscription_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "stripe_customer_id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "payment_number" character varying`);
    }

}
