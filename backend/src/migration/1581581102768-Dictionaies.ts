import {MigrationInterface, QueryRunner} from "typeorm";

// npm install -g ts-node
// ts-node ./node_modules/typeorm/cli.js migration:run
// ts-node ./node_modules/typeorm/cli.js migration:revert
export class Dictionaies1581581102768 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`insert into event_types(id, name) values(1, 'Авторизация')`);
        await queryRunner.query(`insert into event_types(id, name) values(2, 'Создание')`);
        await queryRunner.query(`insert into event_types(id, name) values(3, 'Редактирование')`);
        await queryRunner.query(`insert into event_types(id, name) values(4, 'Удаление')`);

        await queryRunner.query(`insert into object_types(id, name) values(1, 'users')`);
        await queryRunner.query(`insert into object_types(id, name) values(2, 'grages')`);
        await queryRunner.query(`insert into object_types(id, name) values(3, 'gradetypes')`);
        await queryRunner.query(`insert into object_types(id, name) values(4, 'groups')`);
        await queryRunner.query(`insert into object_types(id, name) values(5, 'items')`);
        await queryRunner.query(`insert into object_types(id, name) values(6, 'itemtypes')`);
        await queryRunner.query(`insert into object_types(id, name) values(7, 'rules')`);
        await queryRunner.query(`insert into object_types(id, name) values(8, 'schedules')`);
        await queryRunner.query(`insert into object_types(id, name) values(9, 'tasks')`);
        await queryRunner.query(`insert into object_types(id, name) values(10, 'templates')`);
        await queryRunner.query(`insert into object_types(id, name) values(11, 'topics')`);
        await queryRunner.query(`insert into object_types(id, name) values(12, 'types')`);

        await queryRunner.query(`insert into user_roles(id, name) values(1, 'Преподаватель')`);
        await queryRunner.query(`insert into user_roles(id, name) values(2, 'Студент')`);

        await queryRunner.query(`insert into grade_types(id, name) values(1, 'зачёт/незачёт')`);
        await queryRunner.query(`insert into grade_types(id, name) values(2, 'неуд/удовл/хор/отл')`);

        await queryRunner.query(`insert into grades(id, type_id, name) values(1, 1, 'зачёт')`);
        await queryRunner.query(`insert into grades(id, type_id, name) values(2, 1, 'незачёт')`);
        await queryRunner.query(`insert into grades(id, type_id, name) values(3, 2, 'неуд')`);
        await queryRunner.query(`insert into grades(id, type_id, name) values(4, 2, 'плохо')`);
        await queryRunner.query(`insert into grades(id, type_id, name) values(5, 2, 'удовл')`);
        await queryRunner.query(`insert into grades(id, type_id, name) values(6, 2, 'хор')`);
        await queryRunner.query(`insert into grades(id, type_id, name) values(7, 2, 'отл')`);

        await queryRunner.query(`insert into rule_types(id, name) values(1, 'Количество корректных ответов')`);
        await queryRunner.query(`insert into rule_types(id, name) values(2, 'Количество некорректных ответов')`);

        await queryRunner.query(`insert into item_types(id, name) values(1, 'Текст')`);
        await queryRunner.query(`insert into item_types(id, name) values(2, 'Иллюстрация')`);
        await queryRunner.query(`insert into item_types(id, name) values(3, 'Текстовый пункт выбора')`);
        await queryRunner.query(`insert into item_types(id, name) values(4, 'Графический пункт выбора')`);

        await queryRunner.query(`insert into task_types(id, name) values(1, 'Опросник')`);

        await queryRunner.query(`insert into task_templates(id, type_id, name) values(1, 1, 'Опросник (текстовый)')`);
        await queryRunner.query(`insert into task_templates(id, type_id, name) values(2, 1, 'Опросник (графический)')`);

        await queryRunner.query(`insert into template_items(id, template_id, type_id) values(1, 1, 2)`);
        await queryRunner.query(`insert into template_items(id, template_id, type_id) values(2, 1, 1)`);
        await queryRunner.query(`insert into template_items(id, template_id, type_id) values(3, 1, 3)`);
        await queryRunner.query(`insert into template_items(id, template_id, type_id) values(4, 2, 1)`);
        await queryRunner.query(`insert into template_items(id, template_id, type_id) values(5, 2, 4)`);
    
        await queryRunner.query(`insert into users(id, role_id, fio, login, pass, created) values(1, 1, 'root', 'root', '1', now())`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`delete from users`);
        await queryRunner.query(`delete from user_roles`);
        await queryRunner.query(`delete from grades`);
        await queryRunner.query(`delete from grade_types`);
        await queryRunner.query(`delete from rule_types`);
        await queryRunner.query(`delete from template_items`);
        await queryRunner.query(`delete from item_types`);
        await queryRunner.query(`delete from task_templates`);
        await queryRunner.query(`delete from task_types`);
        await queryRunner.query(`delete from object_types`);
        await queryRunner.query(`delete from event_types`);
    }

}
