import { Test, TestingModule } from '@nestjs/testing';
import { HomeMapService } from './home-map.service';

describe('HomeMapService', () => {
  let service: HomeMapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HomeMapService],
    }).compile();

    service = module.get<HomeMapService>(HomeMapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
