import { Test, TestingModule } from '@nestjs/testing';
import { SavedLocationsService } from './saved-locations.service';

describe('SavedLocationsService', () => {
  let service: SavedLocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SavedLocationsService],
    }).compile();

    service = module.get<SavedLocationsService>(SavedLocationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
