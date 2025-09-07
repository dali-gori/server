import { Controller, Get, Param } from '@nestjs/common';
import { HomeMapService } from './home-map.service';

@Controller('home-map')
export class HomeMapController {
    constructor(private readonly homeMapService: HomeMapService) { }

    @Get()
    async getFires() {
        return await this.homeMapService.fetchHomeMapData();
    }

    @Get('status/:geo_x/:geo_y')
    async getStatus(
        @Param('geo_x') geo_x: number,
        @Param('geo_y') geo_y: number,
    ) {
        return await this.homeMapService.getStatus(geo_x, geo_y);
    }

    @Get('nasa-test')
    async getNasaData() {
        // Example bounding box for Bulgaria
        const west = 22;
        const south = 41;
        const east = 29;
        const north = 45;

        const url = `${process.env.NASA_API_URL}/` +
            `${process.env.FIRMS_API_KEY}/${process.env.NASA_DATA_SOURCE}/` +
            `${west},${south},${east},${north}/2`;

        console.log(url);

        const response = await fetch(url);
        const csv = await response.text();

        return csv
    }
}
