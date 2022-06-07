import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { NewdbModule } from 'src/newdb/newdb.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { JwtModule } from '@nestjs/jwt';
import { CreateTodoDto } from './dto/create-todo.dto';

@Module({
  imports:[NewdbModule,
    TypeOrmModule.forFeature([Todo]),
    JwtModule.register({
      secret:'secre',
      signOptions:{expiresIn:'1d'}
    })
  ],
  controllers: [TodosController],
  providers: [TodosService,CreateTodoDto]
})
export class TodosModule {}
