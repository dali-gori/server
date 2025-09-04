import { Module } from '@nestjs/common';
import { HomeMapController } from './home-map.controller';
import { HomeMapService } from './home-map.service';

@Module({
  controllers: [HomeMapController],
  providers: [HomeMapService]
})
export class HomeMapModule {}
