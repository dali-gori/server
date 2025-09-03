import { Module } from '@nestjs/common';
import { FiresService } from './fires.service';
import { FiresController } from './fires.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fire } from './fire.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Fire]),
  ],
  providers: [FiresService],
  controllers: [FiresController]
})
export class FiresModule {}
