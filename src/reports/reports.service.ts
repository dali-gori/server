import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { NewReportDto } from './dtos/newReportModel.dto';
import { StatusHistory } from 'src/status-history/status-history.entity';
import { UpdateReportDto } from './dtos/updateReportModel.dto';


@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(Report)
        private readonly reportRepository: Repository<Report>,
        @InjectRepository(StatusHistory)
        private readonly statusHistoryRepository: Repository<StatusHistory>,
      ) {}
    async getAllReports() {
        const reports = await this.reportRepository.find({
            relations: ['statusHistory', 'statusHistory.reportStatus'],
        });
    
        return reports.map((report) => {
            // sort histories by createdAt to get the latest
            const sortedHistory = [...report.statusHistory].sort(
                (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
            );
            const latest = sortedHistory[0];
    
            return {
                lat: report.geo_y,
                lng: report.geo_x,
                radius: report.radius,
                statusText: latest?.reportStatus?.name ?? null,
                statusHistory: report.statusHistory.map((history) => ({
                    created_at: history.createdAt,
                    reportStatus: history.reportStatus?.name,
                    reportStatusId: history.statusId,
                })),
            };
        });
    }

    async create(dto: NewReportDto, userId: number) {
        const now = new Date();

        const report = this.reportRepository.create({
            geo_x: dto.geo_x,
            geo_y: dto.geo_y,
            radius: dto.radius,
            createdBy: userId,
            createdAt: now,
            updatedAt: now,
        });

        const savedReport = await this.reportRepository.save(report);

        const initialStatus = this.statusHistoryRepository.create({
            report: savedReport,
            statusId: 2,
            createdAt: now,
            updatedAt: now,
        });

        await this.statusHistoryRepository.save(initialStatus);

        return savedReport;
    }

    async updateReport(
        reportId: number,
        updateData: UpdateReportDto,
    ) {
        const now = new Date();

        const report = await this.reportRepository.findOne({ where: { id: reportId } });
        if (!report) throw new Error('Report not found');

        let updated = false;
        if (updateData.geo_x !== undefined) {
            report.geo_x = updateData.geo_x;
            updated = true;
        }
        if (updateData.geo_y !== undefined) {
            report.geo_y = updateData.geo_y;
            updated = true;
        }

        if (updateData.statusId) {
            const statusHistory = this.statusHistoryRepository.create({
                report,
                statusId: updateData.statusId,
                createdAt: now,
                updatedAt: now,
            });
            await this.statusHistoryRepository.save(statusHistory);
            updated = true;
        }

        if (updated) report.updatedAt = now;
        await this.reportRepository.save(report);

        return report;
    }
}
