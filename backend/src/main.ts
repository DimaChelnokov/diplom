import "reflect-metadata";
import {createConnection} from "typeorm";
import {users} from "./entity/Users";
import {detail_statuses} from "./entity/DetailStatuses";
import {groups} from "./entity/Groups";
import {event_types} from "./entity/EventTypes";
import {user_log} from "./entity/UserLog";
import {user_roles} from "./entity/UserRoles";
import {students} from "./entity/Students";
import {user_details} from "./entity/UserDetails";
import {task_types} from "./entity/TaskTypes";
import {grade_kinds} from "./entity/GradeKinds";
import {grade_types} from "./entity/GradeTypes";
import {tasks} from "./entity/Tasks";
import {grades} from "./entity/Grades";
import {task_grade} from "./entity/TaskGrade";
import {rule_types} from "./entity/RuleTypes";
import {task_templates} from "./entity/TaskTemplates";
import {item_types} from "./entity/ItemTypes";
import {task_topics} from "./entity/TaskTopics";
import {template_items} from "./entity/TemplateItems";
import {task_items} from "./entity/TaskItems";
import {grade_rules} from "./entity/GradeRules";

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  createConnection().then(async connection => {
    console.info("Database created.");
  }).catch(error => console.log(error));

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
