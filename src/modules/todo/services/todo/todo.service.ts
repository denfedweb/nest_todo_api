import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../../entitys/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private usersRepository: Repository<Todo>,
  ) {}

  findAll(): Promise<Todo[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<Todo> {
    return this.usersRepository.findOne(id);
  }

  createOne(todo: Todo): Promise<Todo> {
    return this.usersRepository.save(todo);
  }

  async updateOne(todo: Todo): Promise<any> {
    return this.usersRepository.save(todo);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
