import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { DatabaseModule } from '../database/database.module';
import { itemProviders } from './items.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...itemProviders, ItemsService],
  controllers: [ItemsController]
})
export class ItemsModule {}
