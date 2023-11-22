import { TaskStatus } from '@prisma/client';
import {
  IsOptional,
  IsEnum,
  IsString,
  IsInt,
  IsPositive,
  Min,
} from 'class-validator';

export class FilterDto {
  @IsOptional()
  @IsEnum(TaskStatus, { each: true })
  status?: TaskStatus[] | TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  readonly page?: number = 1;

  @IsOptional()
  @IsInt()
  @IsPositive()
  readonly limit?: number = 10;
}
