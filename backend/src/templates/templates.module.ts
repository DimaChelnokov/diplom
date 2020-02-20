import { Module } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { TemplatesController } from './templates.controller';
import { DatabaseModule } from '../database/database.module';
import { templateProviders } from './templates.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...templateProviders, TemplatesService],
  controllers: [TemplatesController]
})
export class TemplatesModule {}
