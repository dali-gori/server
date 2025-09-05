import { IsNumber, IsOptional } from "class-validator";
import { ReportStatus } from "src/report-statuses/report-status.entity";
import { ExistsInDb } from "src/utils/exists.decorator";

export class UpdateReportDto {
    @IsOptional()
    @IsNumber({}, { message: 'Географската дължина трявба да е число' })
    geo_x?: number;
  
    @IsOptional()
    @IsNumber({}, { message: 'Географската ширина трябва да е число' })
    geo_y?: number;

    @IsOptional()
    @IsNumber({}, { message: 'Номерът на статуса трябва да е число' })
    @ExistsInDb(ReportStatus, 'id', { message: 'Невалиден статус' })
    statusId?: number;
}