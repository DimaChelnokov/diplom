import { Module } from '@nestjs/common';
import { TypesService } from './types.service';
import { TypesController } from './types.controller';

@Module({
  providers: [TypesService],
  controllers: [TypesController]
})
export class TypesModule {}
