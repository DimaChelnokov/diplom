import {MigrationInterface, QueryRunner} from "typeorm";

export class Test1581681458254 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`insert into users(id, role_id, fio, login, pass, created) values(1, 1, 'Иванов И.И.', 'ivan', 'ivan', now())`);
        await queryRunner.query(`insert into users(id, role_id, fio, login, pass, created) values(2, 2, 'Петров П.П.', 'peter', 'peter', now())`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`delete from users`);
    }

}
