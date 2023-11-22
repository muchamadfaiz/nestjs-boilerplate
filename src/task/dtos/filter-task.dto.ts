import { TaskStatus } from '@prisma/client';
import { IsOptional, IsEnum, IsString } from 'class-validator';

export class FilterDto {
  @IsOptional()
  @IsEnum(TaskStatus, { each: true })
  status?: TaskStatus[] | TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
