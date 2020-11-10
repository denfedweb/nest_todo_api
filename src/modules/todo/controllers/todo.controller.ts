import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { Todo } from '../entitys/todo.entity';
import { TodoService } from '../services/todo/todo.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('todo api')
@Controller('api/todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @ApiResponse({
    type: [Todo],
    status: 200,
    description: 'Get all todos',
  })
  @Get()
  getAllAction(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  getOneAction(@Param('id') id: string): Promise<Todo> {
    return this.todoService.findOne(id);
  }

  @Post()
  @ApiBody({ type: Todo })
  createAction(@Body() todo: Todo): Promise<Todo> {
    return this.todoService.createOne(todo);
  }

  @Put(':id')
  async updateAction(@Body() todo: Todo, @Param('id') id: string): Promise<any> {
    const currentTodo = await this.todoService.findOne(id);
    if (currentTodo) {
      currentTodo.title = todo.title;
      currentTodo.isCompleted = todo.isCompleted;
      return this.todoService.updateOne(currentTodo);
    } else {
      return HttpStatus.BAD_REQUEST;
    }
  }

  @Delete(':id')
  async deleteAction(@Param('id') id: string): Promise<HttpStatus.OK> {
    await this.todoService.remove(id);
    return HttpStatus.OK;
  }
}
