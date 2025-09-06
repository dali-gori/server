import { Controller, Get, Param } from '@nestjs/common';
import { HomeMapService } from './home-map.service';

@Controller('home-map')
export class HomeMapController {
    constructor(private readonly homeMapService: HomeMapService) {}

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
}
