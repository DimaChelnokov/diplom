import { Module } from '@nestjs/common';
import { GradetypesService } from './gradetypes.service';
import { GradetypesController } from './gradetypes.controller';
import { DatabaseModule } from '../database/database.module';
import { gradetypeProviders } from './gradetypes.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...gradetypeProviders, GradetypesService],
  controllers: [GradetypesController]
})
export class GradetypesModule {}
