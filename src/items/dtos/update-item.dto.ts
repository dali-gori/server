import { IsInt, IsOptional, Min, IsString } from 'class-validator';
import { Report } from 'src/reports/report.entity';
import { ExistsInDb } from 'src/utils/exists.decorator';

export class UpdateItemDto {
  @IsInt()
  @IsOptional()
  @ExistsInDb(Report, 'id', { message: 'Невалиден сигнал' })
  reportId?: number;

  @IsString()
  @IsOptional()
  name?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  quantity?: number;
}