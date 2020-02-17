import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';
import { TypesModule } from './types/types.module';
import { ItemtypesModule } from './itemtypes/itemtypes.module';
import { GradesModule } from './grades/grades.module';
import { TemplatesModule } from './templates/templates.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [UsersModule, GroupsModule, TypesModule, ItemtypesModule, GradesModule, TemplatesModule],
})
export class AppModule {}
