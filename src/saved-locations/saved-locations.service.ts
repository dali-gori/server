import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SavedLocation } from './saved-location.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class SavedLocationsService {
  constructor(
    @InjectRepository(SavedLocation)
    private readonly savedLocationRepo: Repository<SavedLocation>,
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async findAllByUser(userId: number): Promise<SavedLocation[]> {
    return this.savedLocationRepo.find({ where: { userId } });
  }

  async create(userId: number, data: { name: string; geo_x: number; geo_y: number }): Promise<SavedLocation> {
      // Get user (includes plan and limit)
      const user = await this.usersRepo.findOneByOrFail({ id: userId });

      const limit = user.subscription.locations_limit; // <-- direct access
      const currentCount = await this.savedLocationRepo.count({ where: { userId } });
  
      if (currentCount >= limit) {
        throw new ForbiddenException({
          message: 'Saved locations limit reached for your subscription plan.',
          code: 'PLAN_LIMIT_EXCEEDED',
          details: { current: currentCount, limit },
        });
      }
  
      const entity = this.savedLocationRepo.create({ ...data, userId });
      return this.savedLocationRepo.save(entity);
  }

  async delete(userId: number, id: number): Promise<void> {
    const result = await this.savedLocationRepo.delete({ id, userId });
    if (result.affected === 0) {
      throw new NotFoundException('Не намерена локация');
    }
  }
}
