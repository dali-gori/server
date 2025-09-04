import { Controller, Get } from '@nestjs/common';
import { HomeMapService } from './home-map.service';

@Controller('home-map')
export class HomeMapController {
    constructor(private readonly homeMapService: HomeMapService) {}

    @Get()
    async getFires(): Promise<{ gps_data: {x: number, y:number}[]}> {
        return await this.homeMapService.fetchHomeMapData();
    }
}
