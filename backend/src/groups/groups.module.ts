import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { groupProviders } from './groups.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...groupProviders, GroupsService],
  controllers: [GroupsController]
})
export class GroupsModule {}
