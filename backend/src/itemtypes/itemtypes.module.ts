import { Module } from '@nestjs/common';
import { ItemtypesService } from './itemtypes.service';
import { ItemtypesController } from './itemtypes.controller';

@Module({
  providers: [ItemtypesService],
  controllers: [ItemtypesController]
})
export class ItemtypesModule {}
