import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Role } from 'src/roles/role.entity';
import { Subscription } from 'src/subscriptions/subscription.entity';
import { Region } from 'src/regions/region.entity';
import { Device } from 'src/devices/device.entity';
import { StatusHistory } from 'src/status-history/status-history.entity';
import { ReportStatus } from 'src/report-statuses/report-status.entity';
import { Item } from 'src/items/item.entity';
import { ItemDonation } from 'src/item-donations/item-donation.entity';
import { ItemStatus } from 'src/item-statuses/item-status.entity';
import { SavedLocation } from 'src/saved-locations/saved-location.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Report, User, Role, Subscription, Region, Device, StatusHistory, ReportStatus, Item, ItemDonation, ItemStatus, SavedLocation]),
  ],
  providers: [ReportsService],
  controllers: [ReportsController],
  exports: [ReportsService],
})
export class ReportsModule {}
