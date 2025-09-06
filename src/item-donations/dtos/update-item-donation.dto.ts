import { IsInt, IsNotEmpty } from 'class-validator';
import { ItemStatus } from 'src/item-statuses/item-status.entity';
import { ExistsInDb } from 'src/utils/exists.decorator';

export class UpdateItemDonationDto {
  // The new status ID for the item donation
  @IsInt()
  @IsNotEmpty()
  @ExistsInDb(ItemStatus, 'id', { message: 'Невалиден статус' })
  statusId: number;
}
