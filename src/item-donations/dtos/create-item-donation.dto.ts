import { IsInt, IsString, IsNotEmpty, Min, IsPhoneNumber } from 'class-validator';
import { Item } from 'src/items/item.entity';
import { ExistsInDb } from 'src/utils/exists.decorator';

export class CreateItemDonationDto {
    @IsInt({ message: 'Идентификаторът на артикула трябва да бъде цяло число.' })
    @IsNotEmpty({ message: 'Идентификаторът на артикула е задължителен.' })
    @ExistsInDb(Item, 'id', { message: 'Невалиден артикул.' })
    itemId: number;
  
    // The quantity of the item being donated
    @IsInt({ message: 'Количеството трябва да бъде цяло число.' })
    @Min(1, { message: 'Количеството трябва да бъде поне 1.' })
    @IsNotEmpty({ message: 'Количеството е задължително.' })
    quantity: number;
  
    // The name(s) of the donor(s)
    @IsString({ message: 'Името на дарителя трябва да бъде низ.' })
    @IsNotEmpty({ message: 'Името на дарителя е задължително.' })
    names: string;
  
    // The phone number of the donor
    @IsString({ message: 'Телефонният номер трябва да бъде низ.' })
    @IsNotEmpty({ message: 'Телефонният номер е задължителен.' })
    phoneNumber: string;
}
