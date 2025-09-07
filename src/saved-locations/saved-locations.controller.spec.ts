import { Test, TestingModule } from '@nestjs/testing';
import { SavedLocationsController } from './saved-locations.controller';

describe('SavedLocationsController', () => {
  let controller: SavedLocationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SavedLocationsController],
    }).compile();

    controller = module.get<SavedLocationsController>(SavedLocationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
