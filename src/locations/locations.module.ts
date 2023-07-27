import { Module } from '@nestjs/common';
import { LocationsResolver } from './locations.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationEntity } from './entities/location.entity';
import { EventsEntity } from 'src/events/entities/event.entity';
import { LocationsService } from './locations.service';

@Module({
  imports: [TypeOrmModule.forFeature([LocationEntity, EventsEntity])],
  providers: [LocationsResolver, LocationsService]
})
export class LocationsModule {}
