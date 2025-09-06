import { Test, TestingModule } from '@nestjs/testing';
import { ItemDonationsController } from './item-donations.controller';

describe('ItemDonationsController', () => {
  let controller: ItemDonationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemDonationsController],
    }).compile();

    controller = module.get<ItemDonationsController>(ItemDonationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
