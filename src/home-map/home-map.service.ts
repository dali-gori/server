import { Injectable } from '@nestjs/common';
import { ReportsService } from 'src/reports/reports.service';

@Injectable()
export class HomeMapService {
    constructor(
        private readonly reportService: ReportsService,
    ) { }
    async fetchHomeMapData(): Promise<
        {
            sat_data:
            {
                lat: number;
                lng: number,
                date: string,
                time: string,
                confidence: string // Confidence is string when using VIIRS_NOAA20_NRT and number when using MODIS_NRT
            }[],
            report_data: {
                lat: number;
                lng: number;
                statusHistory: {
                    created_at: Date;
                    reportStatus: string;
                    reportStatusId: number;
                }[]
            }[]
        }> {
        // Example bounding box for Bulgaria
        const west = 22;
        const south = 41;
        const east = 29;
        const north = 45;

        const url = `${process.env.NASA_API_URL}/` +
            `${process.env.FIRMS_API_KEY}/${process.env.NASA_DATA_SOURCE}/` +
            `${west},${south},${east},${north}/2`;

        const response = await fetch(url);
        const csv = await response.text();

        const lines = csv.trim().split('\n').slice(1);
        const sat_data = lines.map(line => {
            const [latitude, longitude, bright_ti4, scan, track, acq_date, acq_time, satellite, instrument, confidence, version, bright_ti5, frp, daynight] = line.split(',');
            if(confidence == "l") return;
            return { lat: parseFloat(latitude), lng: parseFloat(longitude), date: acq_date, time: acq_time, confidence: confidence};
        });

        const report_data = await this.reportService.getAllReports();

        return { sat_data, report_data };
    }
}