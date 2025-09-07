import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { Report } from 'src/reports/report.entity';
import { ExistsInDb } from 'src/utils/exists.decorator';

export class CreateItemDto {
  @IsInt()
  @ExistsInDb(Report, 'id', { message: "Невалиден сигнал" })
  reportId: number;

  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(1)
  quantity: number;
}