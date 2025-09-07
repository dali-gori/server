import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SavedLocation } from './saved-location.entity';

@Injectable()
export class SavedLocationsService {
  constructor(
    @InjectRepository(SavedLocation)
    private readonly savedLocationRepo: Repository<SavedLocation>,
  ) {}

  async findAllByUser(userId: number): Promise<SavedLocation[]> {
    return this.savedLocationRepo.find({ where: { userId } });
  }

  async create(userId: number, data: { name: string; geo_x: number; geo_y: number }): Promise<SavedLocation> {
    const newLocation = this.savedLocationRepo.create({ ...data, userId });
    return this.savedLocationRepo.save(newLocation);
  }

  async delete(userId: number, id: number): Promise<void> {
    const result = await this.savedLocationRepo.delete({ id, userId });
    if (result.affected === 0) {
      throw new NotFoundException('Не намерена локация');
    }
  }
}
