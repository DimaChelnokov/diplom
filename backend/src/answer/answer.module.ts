import { Module } from '@nestjs/common';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { DatabaseModule } from '../database/database.module';
import { answerProviders } from './answer.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...answerProviders, AnswerService],
  controllers: [AnswerController]
})
export class AnswerModule {}
