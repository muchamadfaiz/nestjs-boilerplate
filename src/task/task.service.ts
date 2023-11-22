import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { Task } from '@prisma/client';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { FilterDto } from './dtos/filter-task.dto';

@Injectable()
export class TaskService {
  constructor(private taskRepository: TaskRepository) {}

  async getTasks(filterDto: FilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto);
  }

  async getTasksByUserId(
    user_id: string,
    filterDto: FilterDto,
  ): Promise<Task[]> {
    return this.taskRepository.getTasksByUserId(user_id, filterDto);
  }

  async getTaskById(id: string): Promise<Task | null> {
    const task = await this.taskRepository.getTaskById(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    user_id: string,
  ): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user_id);
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    await this.getTaskById(id);
    return this.taskRepository.updateTask(id, updateTaskDto);
  }

  async deleteTask(id: string): Promise<Task> {
    await this.getTaskById(id);
    return this.taskRepository.deleteTask(id);
  }
}
