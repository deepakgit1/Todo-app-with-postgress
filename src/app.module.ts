import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { NewdbModule } from './newdb/newdb.module';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [AuthModule, NewdbModule, TodosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
