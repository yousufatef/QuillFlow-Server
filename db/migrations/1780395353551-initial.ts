import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1780395353551 implements MigrationInterface {
    name = 'Initial1780395353551'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "size" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "size"`);
    }

}
