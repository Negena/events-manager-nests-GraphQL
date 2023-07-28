import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsResolver } from './events.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsEntity } from './entities/event.entity';
import { LocationEntity } from './entities/location.entity';
import { BullModule } from '@nestjs/bull';
import { transcode } from 'env';
import { TransCodeConsumer } from './transcode.consumer';

@Module({
  imports: [BullModule.forRoot({
    redis: {
      host: "localhost", 
      port: 6379,
    }
  }), 
  BullModule.registerQueue({
    name: transcode
  }),
    TypeOrmModule.forFeature([EventsEntity, LocationEntity])],
  providers: [EventsResolver, EventsService, TransCodeConsumer]
})
export class EventsModule {}
