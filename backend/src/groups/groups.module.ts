import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { groupProviders } from './groups.providers';
import { DatabaseModule } from '../database/database.module';
import { usersProviders } from '../users/users.providers';
import { UsersService } from '../users/users.service';

@Module({
  imports: [DatabaseModule],
  providers: [...groupProviders, ...usersProviders, GroupsService, UsersService],
  controllers: [GroupsController]
})
export class GroupsModule {}
