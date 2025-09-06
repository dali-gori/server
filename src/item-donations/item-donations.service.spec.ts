import { Test, TestingModule } from '@nestjs/testing';
import { ItemDonationsService } from './item-donations.service';

describe('ItemDonationsService', () => {
  let service: ItemDonationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemDonationsService],
    }).compile();

    service = module.get<ItemDonationsService>(ItemDonationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
