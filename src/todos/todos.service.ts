import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository:Repository<Todo>,private jwtService1: JwtService){}


  async createTodo(data: any): Promise<Todo> {
    const tkn = data.token
    const userId = await this.jwtService1.verify(tkn)
    console.log(userId)
    const nData ={
      ...data,
      userId:Number(userId.id)
    }
    return this.todoRepository.save(nData)
  }

  async findAll(data:any):Promise<Todo[]> {
    let todo:Todo = new Todo()
    console.log(data,"sdm,mdmsad")
    let v = (this.jwtService1.verify(data.token))
    console.log(v.id);
    
    let data1 = await this.todoRepository.find({
      where:{
        userId:v.id
      }
    })
    return data1
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    let todos : Todo = new Todo();
    todos.title = updateTodoDto.title;
    todos.task = updateTodoDto.task;
    todos.id = id
    return this.todoRepository.save(todos)
  }

  remove(id: number) {
    return this.todoRepository.delete(id)
  }
}
