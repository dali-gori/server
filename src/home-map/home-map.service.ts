import { Injectable } from '@nestjs/common';
import { ReportsService } from 'src/reports/reports.service';

@Injectable()
export class HomeMapService {
    constructor(
        private readonly reportService: ReportsService,
    ) { }
    async fetchHomeMapData() {
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
            if (confidence == "l") return;
            return { lat: parseFloat(latitude), lng: parseFloat(longitude), date: acq_date, time: acq_time, confidence: confidence };
        });

        const report_data = await this.reportService.getAllReports();

        return { sat_data, report_data };
    }

    private haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371; // Earth radius in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;

        const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1 * Math.PI / 180) *
            Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) ** 2;

        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }

    async getStatus(geo_x: number, geo_y: number): Promise<boolean> {
        // fetch all reports
        const report_data = await this.reportService.getAllReports();

        for (const report of report_data) {
            const distance = this.haversine(geo_x, geo_y, report.lng, report.lat);

            // condition: distance minus radius < 3 km
            if (distance - report.radius/1000 < 3) {
                return true;
            }
        }

        return false;
    }
}