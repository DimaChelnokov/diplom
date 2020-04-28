import {MigrationInterface, QueryRunner} from "typeorm";

// npm install -g ts-node
// ts-node ./node_modules/typeorm/cli.js migration:run
// ts-node ./node_modules/typeorm/cli.js migration:revert
export class Test1588054689331 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`insert into groups(id, name, date_from) values(1, '1001', now())`);
        await queryRunner.query(`insert into tasks(id, created_by, gradetype_id, type_id, name, created) values(1, 1, 1, 1, 'Схема подключения транзистора', now())`);
        await queryRunner.query(`insert into group_tasks(id, task_id, group_id, created, created_by) values(1, 1, 1, now(), 1)`);

        await queryRunner.query(`insert into task_topics(id, task_id, template_id, is_radio) values(1, 1, 1, true)`);
        await queryRunner.query(`insert into task_topics(id, task_id, template_id, is_radio) values(2, 1, 1, true)`);
        await queryRunner.query(`insert into task_topics(id, task_id, template_id, is_radio) values(3, 1, 1, true)`);

        await queryRunner.query(`insert into picture(internal_name, file_name, user_id, loaded) values('1.png', '1.png', 1, now())`);
        await queryRunner.query(`insert into picture(internal_name, file_name, user_id, loaded) values('2.png', '2.png', 1, now())`);
        await queryRunner.query(`insert into picture(internal_name, file_name, user_id, loaded) values('3.png', '3.png', 1, now())`);

        await queryRunner.query(`insert into task_items(id, topic_id, item_id, txt, is_correct) values(1, 1, 1, '1.png', false)`);
        await queryRunner.query(`insert into task_items(id, topic_id, item_id, txt, is_correct) values(2, 1, 2, 'Выберите тип схемы подключения:', false)`);
        await queryRunner.query(`insert into task_items(id, topic_id, item_id, txt, is_correct) values(3, 1, 3, 'Подключение с общим эмиттером', true)`);
        await queryRunner.query(`insert into task_items(id, topic_id, item_id, txt, is_correct) values(4, 1, 3, 'Подключение с общим коллектором', false)`);
        await queryRunner.query(`insert into task_items(id, topic_id, item_id, txt, is_correct) values(5, 1, 3, 'Подключение с общей базой', false)`);

        await queryRunner.query(`insert into task_items(id, topic_id, item_id, txt, is_correct) values(6, 2, 1, '2.png', false)`);
        await queryRunner.query(`insert into task_items(id, topic_id, item_id, txt, is_correct) values(7, 2, 2, 'Выберите тип схемы подключения:', false)`);
        await queryRunner.query(`insert into task_items(id, topic_id, item_id, txt, is_correct) values(8, 2, 3, 'Подключение с общим эмиттером', false)`);
        await queryRunner.query(`insert into task_items(id, topic_id, item_id, txt, is_correct) values(9, 2, 3, 'Подключение с общим коллектором', true)`);
        await queryRunner.query(`insert into task_items(id, topic_id, item_id, txt, is_correct) values(10, 2, 3, 'Подключение с общей базой', false)`);

        await queryRunner.query(`insert into task_items(id, topic_id, item_id, txt, is_correct) values(11, 3, 1, '3.png', false)`);
        await queryRunner.query(`insert into task_items(id, topic_id, item_id, txt, is_correct) values(12, 3, 2, 'Выберите тип схемы подключения:', false)`);
        await queryRunner.query(`insert into task_items(id, topic_id, item_id, txt, is_correct) values(13, 3, 3, 'Подключение с общим эмиттером', false)`);
        await queryRunner.query(`insert into task_items(id, topic_id, item_id, txt, is_correct) values(14, 3, 3, 'Подключение с общим коллектором', false)`);
        await queryRunner.query(`insert into task_items(id, topic_id, item_id, txt, is_correct) values(15, 3, 3, 'Подключение с общей базой', true)`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`delete from task_items`);
        await queryRunner.query(`delete from picture`);
        await queryRunner.query(`delete from task_topics`);

        await queryRunner.query(`delete from group_tasks`);
        await queryRunner.query(`delete from groups`);
        await queryRunner.query(`delete from tasks`);
    }

}
