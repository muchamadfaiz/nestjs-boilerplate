import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Task } from '@prisma/client';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { FilterDto } from './dtos/filter-task.dto';

@Injectable()
export class TaskRepository {
  constructor(private prisma: PrismaService) {}

  async getTasks(filterDto: FilterDto): Promise<Task[]> {
    const { status, search } = filterDto;

    const whereCondition = {};

    if (status) {
      if (Array.isArray(status)) {
        whereCondition['status'] = { in: status };
      } else {
        whereCondition['status'] = status;
      }
    }

    if (search) {
      whereCondition['OR'] = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.task.findMany({
      where: whereCondition,
      orderBy: { updated_at: 'desc' },
    });
  }

  async getTasksByUserId(
    user_id: string,
    filterDto: FilterDto,
  ): Promise<Task[]> {
    const { status, search } = filterDto;

    const whereCondition = { user_id };

    if (status) {
      whereCondition['status'] = Array.isArray(status)
        ? { in: status }
        : status;
    }

    if (search) {
      whereCondition['OR'] = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }
    return this.prisma.task.findMany({
      orderBy: { updated_at: 'desc' },
      where: whereCondition,
    });
  }

  async getTaskById(id: string): Promise<Task | null> {
    return this.prisma.task.findUnique({
      where: { id },
    });
  }
  async createTask(
    createTaskDto: CreateTaskDto,
    user_id: string,
  ): Promise<Task> {
    return this.prisma.task.create({
      data: {
        ...createTaskDto,
        user: {
          connect: { id: user_id },
        },
      },
    });
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  async deleteTask(id: string): Promise<Task> {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}
