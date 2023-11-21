import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Task } from '@prisma/client';
import { CreateTaskDto } from './dtos/create-task.dto';

@Injectable()
export class TaskRepository {
  constructor(private prisma: PrismaService) {}

  async getTasks(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }
  async createTask(data: CreateTaskDto): Promise<Task> {
    return this.prisma.task.create({ data });
  }
}
