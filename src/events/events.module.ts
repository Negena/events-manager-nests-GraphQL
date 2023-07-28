import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsResolver } from './events.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsEntity } from './entities/event.entity';
import { LocationEntity } from './entities/location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventsEntity, LocationEntity])],
  providers: [EventsResolver, EventsService]
})
export class EventsModule {}
