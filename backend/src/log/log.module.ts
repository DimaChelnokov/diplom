import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { DatabaseModule } from '../database/database.module';
import { logProviders } from './log.providers';
import { usersProviders } from '../users/users.providers';
import { UsersService } from '../users/users.service';
import { studentProviders } from '../users/students.provider';
import { tokensProvider } from '../users/tokens.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...logProviders, ...usersProviders, ...studentProviders, ...tokensProvider, LogService, UsersService],
  controllers: [LogController]
})
export class LogModule {}
