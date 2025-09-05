import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';

@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(Report)
        private readonly reportRepository: Repository<Report>,
    ) { }
    // Fetch reports with all related statuses
    async getAllReports() {
        const reports = await this.reportRepository.find({
            relations: ['statusHistory', 'statusHistory.reportStatus'],
        });
        
        return reports.map((report) => ({
            lat: report.geo_y,
            lng: report.geo_x,
            statusHistory: report.statusHistory.map((history) => ({
                created_at: history.createdAt,
                reportStatus: history.reportStatus?.name,
                reportStatusId: history.statusId,
            })),
        }));
    }
}
