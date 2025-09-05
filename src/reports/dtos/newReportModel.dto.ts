import { IsNumber, IsNotEmpty } from 'class-validator';

export class NewReportDto {
  @IsNumber({}, { message: 'Географската дължина трявба да е число' })
  geo_x: number;

  @IsNumber({}, { message: 'Географската ширина трябва да е число' })
  geo_y: number;
}