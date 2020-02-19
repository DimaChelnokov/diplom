import { Module } from '@nestjs/common';
import { TypesService } from './types.service';
import { TypesController } from './types.controller';
import { typeProviders } from './types.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...typeProviders, TypesService],
  controllers: [TypesController]
})
export class TypesModule {}
