import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from 'src/items/item.entity';
import { ItemDonation } from 'src/item-donations/item-donation.entity';
import { ItemStatus } from 'src/item-statuses/item-status.entity';
import { ExistsInDbConstraint } from 'src/utils/exists.constraint';
import { ItemDonationsController } from './item-donations.controller';
import { ItemDonationsService } from './item-donations.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item, ItemDonation, ItemStatus]),
  ],
  controllers: [ItemDonationsController],
  providers: [ItemDonationsService, ExistsInDbConstraint]
})
export class ItemDonationsModule {}
