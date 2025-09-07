import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { NewReportDto } from './dtos/newReportModel.dto';
import { StatusHistory } from 'src/status-history/status-history.entity';
import { UpdateReportDto } from './dtos/updateReportModel.dto';

const SPREADING_STATUS_ID = 4;

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
            relations: ['statusHistory', 'statusHistory.reportStatus', 'items', 'items.donations'],
        });

        console.log(reports);
    
        return reports.map((report) => {
            // sort histories by createdAt to get the latest
            const sortedHistory = [...report.statusHistory].sort(
                (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
            );
            const latest = sortedHistory[0];
    
            return {
                id: report.id,
                lat: report.geo_y,
                lng: report.geo_x,
                radius: report.radius,
                statusId: latest.statusId,
                statusText: latest?.reportStatus?.name ?? null,
                latestStatusId: latest?.reportStatus?.id ?? null,
                statusHistory: report.statusHistory.map((history) => ({
                    created_at: history.createdAt,
                    reportStatus: history.reportStatus?.name,
                    reportStatusId: history.statusId,
                }),
                ),
                items: report.items,
            };
        });
    }
    
    async getReportById(id: number) {
        const report = await this.reportRepository.findOne({
            where: { id },
            relations: [
                'statusHistory',
                'statusHistory.reportStatus',
                'items',
                'items.donations',
            ],
        });
    
        if (!report) {
            return null; // or throw an error if you prefer
        }
    
        // sort histories by createdAt to get the latest
        const sortedHistory = [...report.statusHistory].sort(
            (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        );
        const latest = sortedHistory[0];
    
        return {
            id: report.id,
            lat: report.geo_y,
            lng: report.geo_x,
            radius: report.radius,
            statusId: latest?.statusId ?? null,
            statusText: latest?.reportStatus?.name ?? null,
            latestStatusId: latest?.reportStatus?.id ?? null,
            statusHistory: report.statusHistory.map((history) => ({
                created_at: history.createdAt,
                reportStatus: history.reportStatus?.name,
                reportStatusId: history.statusId,
            })),
            items: report.items,
        };
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
            statusId: SPREADING_STATUS_ID,
            createdAt: now,
            updatedAt: now,
        });

        await this.statusHistoryRepository.save(initialStatus);

        return savedReport;
    }

    async delete(id: number) {
        const report = await this.reportRepository.findOne({ where: { id } });
        
        if (!report) {
            throw new Error('Report not found');
        }

        await this.reportRepository.remove(report);
        return { message: 'Report deleted successfully' };
    }

    async updateReportStatus(reportId: number, statusId: number) {
        const now = new Date();

        const report = await this.reportRepository.findOne({ where: { id: reportId } });
        if (!report) {
            throw new Error('Report not found');
        }

        // Update the statusId on the report itself (if such a field exists)
        // If the report entity does not have a statusId, this will be a no-op
        if ('statusId' in report) {
            report.statusId = statusId;
        }

        // Add a new status history entry
        const statusHistory = this.statusHistoryRepository.create({
            report,
            statusId,
            createdAt: now,
            updatedAt: now,
        });

        await this.statusHistoryRepository.save(statusHistory);

        report.updatedAt = now;
        await this.reportRepository.save(report);

        return { message: 'Report status updated successfully' };
    }

    async updateReportLocationAndRadius(
        reportId: number,
        geo_x: number,
        geo_y: number,
        radius: number
    ) {
        const now = new Date();

        const report = await this.reportRepository.findOne({ where: { id: reportId } });
        if (!report) {
            throw new Error('Report not found');
        }

        report.geo_x = geo_x;
        report.geo_y = geo_y;
        report.radius = radius;
        report.updatedAt = now;

        await this.reportRepository.save(report);

        return { message: 'Report location and radius updated successfully' };
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
