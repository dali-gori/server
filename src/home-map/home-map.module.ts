import { Module } from '@nestjs/common';
import { HomeMapController } from './home-map.controller';
import { HomeMapService } from './home-map.service';
import { ReportsModule } from 'src/reports/reports.module';

@Module({
  controllers: [HomeMapController],
  providers: [HomeMapService],
  imports: [ReportsModule]
})
export class HomeMapModule {}
