import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';
import { GradesModule } from './grades/grades.module';
import { TasksModule } from './tasks/tasks.module';
import { SchedulesModule } from './schedules/schedules.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { GradetypesModule } from './gradetypes/gradetypes.module';
import { LogModule } from './log/log.module';
import { logProviders } from './log/log.providers';
import { LogService } from './log/log.service';
import { MulterModule } from '@nestjs/platform-express';
import { AnswerModule } from './answer/answer.module';

@Module({
  controllers: [AppController],
  providers: [...logProviders, LogService],
  imports: [ MulterModule.register({
    dest: './upload',
  }), 
  UsersModule, 
  GroupsModule, 
  GradesModule, 
  TasksModule, 
  SchedulesModule, 
  DatabaseModule, 
  AuthModule, 
  GradetypesModule, 
  LogModule, AnswerModule],
})
export class AppModule { }
