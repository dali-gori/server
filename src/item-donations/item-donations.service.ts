import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryRunner, DataSource } from 'typeorm';
import { ItemDonation } from './item-donation.entity';
import { Item } from '../items/item.entity';
import { CreateItemDonationDto } from './dtos/create-item-donation.dto';
import { UpdateItemDonationDto } from './dtos/update-item-donation.dto';

const INITIAL_STATUS = 1;

@Injectable()
export class ItemDonationsService {
    constructor(
        @InjectRepository(ItemDonation)
        private itemDonationRepository: Repository<ItemDonation>,
        @InjectRepository(Item)
        private itemRepository: Repository<Item>,
        private dataSource: DataSource,
    ) { }

    /**
     * Creates a new item donation and decreases the quantity of the associated item.
     * This operation is performed within a database transaction to ensure atomicity.
     * @param createItemDonationDto The data for the new item donation.
     * @returns The newly created ItemDonation entity.
     */
    async create(createItemDonationDto: CreateItemDonationDto): Promise<ItemDonation> {
        const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const { itemId, quantity, names, phoneNumber } = createItemDonationDto;

            // Find the item to be donated
            const item = await queryRunner.manager.findOne(Item, { where: { id: itemId } });
            if (!item) {
                throw new NotFoundException(`Артикул ${itemId} не е намерен.`);
            }

            // Check if there is enough quantity to donate
            if (item.quantity < quantity) {
                throw new BadRequestException(`Количеството изисквано на ${item.name} е по-малко от въведеното. Въведено: ${quantity}, Изисквано: ${item.quantity}.`);
            }

            // Decrease the item quantity
            item.quantity -= quantity;
            await queryRunner.manager.save(Item, item);

            // Create and save the new item donation
            const newItemDonation = this.itemDonationRepository.create({
                itemId,
                quantity,
                names,
                phoneNumber,
                statusId: INITIAL_STATUS,
            });
            const savedDonation = await queryRunner.manager.save(ItemDonation, newItemDonation);

            await queryRunner.commitTransaction();
            return savedDonation;
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    /**
     * Updates the status of an existing item donation.
     * @param id The ID of the item donation.
     * @param updateItemDonationDto The new status data.
     * @returns The updated ItemDonation entity.
     */
    /**
       * Updates the status of an existing item donation with guarding based on current status and user role.
       * @param id The ID of the item donation.
       * @param updateItemDonationStatusDto The new status data.
       * @param roleId The role ID of the current user.
       * @returns The updated ItemDonation entity.
       */
    async updateStatus(
        id: number,
        dtoData: UpdateItemDonationDto,
        roleId: number,
    ): Promise<ItemDonation> {
        console.log(roleId);
        const donation = await this.itemDonationRepository.findOne({ where: { id } });

        if (!donation) {
        throw new NotFoundException(`Дарение на артикул с ID ${id} не е намерено.`);
        }
    
        // Guard 1: Check if the current status is Pending (id: 1)
        if (donation.statusId !== 1) {
        throw new BadRequestException('Не може да се актуализира статусът. Текущият статус не е "На път".');
        }
    
        // Guard 2: Check user permissions based on their role
        const newStatusId = dtoData.statusId;
        if (roleId === 1 && newStatusId !== 3) {
        throw new BadRequestException('Можете да променяте статуса само на "Отказан" (id: 3).');
        }
    
        if (roleId === 2 && (newStatusId !== 2 && newStatusId !== 3)) {
        throw new BadRequestException('Можете да променяте статуса само на "Получен" (id: 2) или "Отказан" (id: 3).');
        }
    
        if (roleId !== 1 && roleId !== 2) {
        throw new BadRequestException('Невалидна потребителска роля за тази операция.');
        }
      

        donation.statusId = newStatusId;
        return this.itemDonationRepository.save(donation);
    }

    /**
     * Retrieves all item donations for a specific item.
     * @param itemId The ID of the item.
     * @returns An array of ItemDonation entities.
     */
    async findByItem(itemId: number): Promise<ItemDonation[]> {
        const donations = await this.itemDonationRepository.find({
            where: { itemId },
            relations: ['item', 'status'], // Load the related item and status entities
        });

        return donations;
    }
}
