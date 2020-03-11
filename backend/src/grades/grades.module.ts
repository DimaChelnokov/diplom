import { Module } from '@nestjs/common';
import { GradesService } from './grades.service';
import { GradesController } from './grades.controller';
import { DatabaseModule } from '../database/database.module';
import { gradeProviders } from './grades.providers';
import { usersProviders } from '../users/users.providers';
import { UsersService } from '../users/users.service';

@Module({
  imports: [DatabaseModule],
  providers: [...gradeProviders, ...usersProviders, GradesService, UsersService],
  controllers: [GradesController]
})
export class GradesModule {}
