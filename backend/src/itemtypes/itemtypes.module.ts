import { Module } from '@nestjs/common';
import { ItemtypesService } from './itemtypes.service';
import { ItemtypesController } from './itemtypes.controller';
import { itemtypeProviders } from './itemtypes.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...itemtypeProviders, ItemtypesService],
  controllers: [ItemtypesController]
})
export class ItemtypesModule {}
