import { Controller, Get } from '@nestjs/common';
import { HomeMapService } from './home-map.service';

@Controller('home-map')
export class HomeMapController {
    constructor(private readonly homeMapService: HomeMapService) {}

    @Get()
    async getFires(): Promise<
    {
        sat_data:
        {
            lat: number;
            lng: number,
            date: string,
            time: string,
            confidence: string
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
        return await this.homeMapService.fetchHomeMapData();
    }
}
