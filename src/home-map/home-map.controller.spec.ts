import { Test, TestingModule } from '@nestjs/testing';
import { HomeMapController } from './home-map.controller';

describe('HomeMapController', () => {
  let controller: HomeMapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomeMapController],
    }).compile();

    controller = module.get<HomeMapController>(HomeMapController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
