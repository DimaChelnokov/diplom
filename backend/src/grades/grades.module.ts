import { Module } from '@nestjs/common';
import { GradesService } from './grades.service';
import { GradesController } from './grades.controller';
import { DatabaseModule } from '../database/database.module';
import { gradeProviders } from './grades.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...gradeProviders, GradesService],
  controllers: [GradesController]
})
export class GradesModule {}
