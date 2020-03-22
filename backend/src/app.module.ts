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
import { GradetypesModule } from './gradetypes/gradetypes.module';
import { RulesModule } from './rules/rules.module';
import { LogModule } from './log/log.module';
import { logProviders } from './log/log.providers';
import { LogService } from './log/log.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  controllers: [AppController],
  providers: [...logProviders, LogService],
  imports: [ MulterModule.register({
    dest: './upload',
  }), 
  UsersModule, 
  GroupsModule, 
  TypesModule, 
  ItemtypesModule, 
  GradesModule, 
  TemplatesModule, 
  TopicsModule, 
  ItemsModule, 
  TasksModule, 
  SchedulesModule, 
  DatabaseModule, 
  AuthModule, 
  GradetypesModule, 
  RulesModule, 
  LogModule],
})
export class AppModule {}
