import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';
import { TypesModule } from './types/types.module';
import { ItemtypesModule } from './itemtypes/itemtypes.module';
import { GradesModule } from './grades/grades.module';
import { TemplatesModule } from './templates/templates.module';
import { TopicsModule } from './topics/topics.module';
import { ItemsModule } from './items/items.module';
import { TasksModule } from './tasks/tasks.module';
import { SchedulesModule } from './schedules/schedules.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [AppController],
  imports: [UsersModule, GroupsModule, TypesModule, ItemtypesModule, GradesModule, TemplatesModule, TopicsModule, ItemsModule, TasksModule, SchedulesModule, DatabaseModule, AuthModule],
})
export class AppModule {}
