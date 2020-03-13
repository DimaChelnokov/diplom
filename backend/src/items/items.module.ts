import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { DatabaseModule } from '../database/database.module';
import { itemProviders } from './items.providers';
import { usersProviders } from '../users/users.providers';
import { UsersService } from '../users/users.service';
import { logProviders } from '../log/log.providers';
import { LogService } from '../log/log.service';
import { studentProviders } from '../users/students.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...itemProviders, ...usersProviders, ...studentProviders, ...logProviders, ItemsService, UsersService, LogService],
  controllers: [ItemsController]
})
export class ItemsModule {}
