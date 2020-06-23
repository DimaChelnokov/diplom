import { Module } from '@nestjs/common';
import { GradetypesService } from './gradetypes.service';
import { GradetypesController } from './gradetypes.controller';
import { DatabaseModule } from '../database/database.module';
import { gradetypeProviders } from './gradetypes.providers';
import { usersProviders } from '../users/users.providers';
import { studentProviders } from '../users/students.provider';
import { logProviders } from '../log/log.providers';
import { tokensProvider } from '../users/tokens.provider';
import { UsersService } from '../users/users.service';

@Module({
  imports: [DatabaseModule],
  providers: [...gradetypeProviders, ...usersProviders, ...studentProviders, ...logProviders, ...tokensProvider, UsersService, GradetypesService],
  controllers: [GradetypesController]
})
export class GradetypesModule {}
