import { Controller, Post, Body, Patch, Param, Get, ParseIntPipe, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ItemDonationsService } from './item-donations.service';
import { CreateItemDonationDto } from './dtos/create-item-donation.dto';
import { UpdateItemDonationDto } from './dtos/update-item-donation.dto';
import { ItemDonation } from './item-donation.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/roles.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/users/user.entity';

@Controller('item-donations')
export class ItemDonationsController {
    constructor(private readonly itemDonationsService: ItemDonationsService) { }

    /**
     * Creates a new item donation.
     * @param createItemDonationDto The data for the new donation.
     * @returns A Promise of the created ItemDonation.
     */
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(JwtAuthGuard, RoleGuard(1))
    create(@Body() createItemDonationDto: CreateItemDonationDto): Promise<ItemDonation> {
        return this.itemDonationsService.create(createItemDonationDto);
    }

    /**
     * Updates the status of an existing item donation.
     * @param id The ID of the item donation to update.
     * @param updateItemDonationDto The new status data.
     * @returns A Promise of the updated ItemDonation.
     */
    @Patch(':id/status')
    @UseGuards(JwtAuthGuard)
    updateStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateItemDonationDto: UpdateItemDonationDto,
        @CurrentUser() user: { userId: number, email: string, role: number }
    ): Promise<ItemDonation> {
        console.log(user);
        return this.itemDonationsService.updateStatus(id, updateItemDonationDto, user.role);
    }

    /**
     * Retrieves all item donations for a specific item.
     * @param itemId The ID of the item.
     * @returns A Promise of an array of ItemDonations.
     */
    @Get('item/:itemId')
    findByItem(@Param('itemId', ParseIntPipe) itemId: number): Promise<ItemDonation[]> {
        return this.itemDonationsService.findByItem(itemId);
    }
}
