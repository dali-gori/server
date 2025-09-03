import { Controller, Get } from '@nestjs/common';
import { FiresService } from './fires.service';

@Controller('fires')
export class FiresController {
  constructor(private readonly firesService: FiresService) {}

  @Get()
  async getFires(): Promise<string[]> {
    return this.firesService.findAllJoined();
  }
}
