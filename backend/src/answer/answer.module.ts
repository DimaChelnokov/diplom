import { Module } from '@nestjs/common';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { DatabaseModule } from '../database/database.module';
import { answerProviders } from './answer.providers';
import { UsersService } from '../users/users.service';
import { usersProviders } from '../users/users.providers';
import { tokensProvider } from '../users/tokens.provider';
import { studentProviders } from '../users/students.provider';
import { logProviders } from '../log/log.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...answerProviders, ...usersProviders, ...studentProviders, ...logProviders, ...tokensProvider, AnswerService, UsersService],
  controllers: [AnswerController]
})
export class AnswerModule {}
