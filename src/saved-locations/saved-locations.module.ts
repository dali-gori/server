import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SavedLocation } from './saved-location.entity';
import { SavedLocationsService } from './saved-locations.service';
import { SavedLocationsController } from './saved-locations.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SavedLocation])],
  providers: [SavedLocationsService],
  controllers: [SavedLocationsController],
})
export class SavedLocationsModule {}
