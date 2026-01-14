import { MigrationInterface, QueryRunner } from "typeorm";
export declare class Timestamps1768345380166 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
