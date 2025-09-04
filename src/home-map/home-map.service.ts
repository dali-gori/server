import { Injectable } from '@nestjs/common';

@Injectable()
export class HomeMapService {
    async fetchHomeMapData(): Promise<{ sat_data: { x: number; y: number }[] }> {
        // Example bounding box for Bulgaria
        const west = 22.357;
        const south = 41.235;
        const east = 28.607;
        const north = 44.217;

        const url = `${process.env.NASA_API_URL}/` +
            `${process.env.FIRMS_API_KEY}/MODIS_NRT/` +
            `${west},${south},${east},${north}/1`;

        const response = await fetch(url);
        const csv = await response.text();

        const lines = csv.trim().split('\n').slice(1);
        const sat_data = lines.map(line => {
            const [ latitude, longitude, brightness, scan, track, acq_date, acq_time, satellite, instrument, confidence, version, bright_t31, frp, daynight ] = line.split(',');
            return { x: parseFloat(latitude), y: parseFloat(longitude), date: acq_date, time: acq_time, confidence: confidence };
        });

        return { sat_data };
    }
}