import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task, User } from '@prisma/client';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from 'src/auth/enums/user-role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UpdateTaskDto } from './dtos/update-task.dto';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get('all')
  @Roles(UserRole.ADMIN)
  async getTasks(): Promise<Task[]> {
    return this.taskService.getTasks();
  }

  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<Task | null> {
    console.log('Param id:', id);
    return this.taskService.getTaskById(id);
  }

  @Get()
  async getTasksByUserId(@GetUser() user: User) {
    return this.taskService.getTasksByUserId(user.id);
  }

  @Post()
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.createTask(createTaskDto, user.id);
  }

  @Patch('/:id')
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.updateTask(id, updateTaskDto);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: string): Promise<void> {
    await this.taskService.deleteTask(id);
    return;
  }
}
