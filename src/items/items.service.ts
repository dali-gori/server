import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { CreateItemDto } from './dtos/create-item.dto';
import { UpdateItemDto } from './dtos/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepo: Repository<Item>,
  ) {}

  async findAll(): Promise<Item[]> {
    return this.itemRepo.find({
      relations: ['report'], // fetch report data along
    });
  }

  async findOne(id: number): Promise<Item> {
    const item = await this.itemRepo.findOne({
      where: { id },
      relations: ['report'],
    });
    if (!item) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }
    return item;
  }

  async create(dto: CreateItemDto): Promise<Item> {
    const now = new Date();

    const item = this.itemRepo.create({
        reportId: dto.reportId,
        name: dto.name,
        quantity: dto.quantity,
        createdAt: now,
        updatedAt: now,
    });
    const savedItem = await this.itemRepo.save(item); // save single entity
    return savedItem; // TypeScript now knows this is Item
  }

  async update(id: number, dto: UpdateItemDto): Promise<Item> {
    const item = await this.findOne(id);
    Object.assign(item, dto);
    return this.itemRepo.save(item);
  }

  async remove(id: number): Promise<void>{
    const item = await this.findOne(id);
    await this.itemRepo.remove(item);
  }
}
