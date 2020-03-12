import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { groupProviders } from './groups.providers';
import { DatabaseModule } from '../database/database.module';
import { usersProviders } from '../users/users.providers';
import { UsersService } from '../users/users.service';
import { logProviders } from '../log/log.providers';
import { LogService } from '../log/log.service';

@Module({
  imports: [DatabaseModule],
  providers: [...groupProviders, ...usersProviders, ...logProviders, GroupsService, UsersService, LogService],
  controllers: [GroupsController]
})
export class GroupsModule {}
