import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../database/database.module';
import { usersProviders } from './users.providers';
import { studentProviders } from './students.provider';
import { logProviders } from '../log/log.providers';
import { LogService } from '../log/log.service';

@Module({
  imports: [DatabaseModule],
  providers: [...usersProviders, ...studentProviders, ...logProviders, UsersService, LogService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
