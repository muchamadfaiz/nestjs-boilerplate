// src/task/dtos/update-task.dto.ts

import { Status } from '@prisma/client';
import { IsOptional, IsString, IsEnum } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(Status)
  status?: Status;
}
