import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fire } from './fire.entity';

@Injectable()
export class FiresService {
  constructor(
    @InjectRepository(Fire)
    private readonly fireRepo: Repository<Fire>,
  ) {}

  async findAllJoined(): Promise<string[]> {
    const fires = await this.fireRepo.find();
    return fires.map(
      f => `ID: ${f.id}, GEO_Y: ${f.geo_y}, GEO_X: ${f.geo_x}, STATUS: ${f.status}, DESCRIPTION: ${f.description}`,
    );
  }
}
