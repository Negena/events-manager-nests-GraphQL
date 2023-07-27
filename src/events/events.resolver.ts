import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EventsService } from './events.service';
import {EventsEntity as Event, EventsEntity } from './entities/event.entity';
import { EventsDto} from './dto/create-event.input';
import { LocationEntity } from 'src/locations/entities/location.entity';
import { updEventsDto } from './dto/update-event.dto';

@Resolver(() => Event)
export class EventsResolver {
  constructor(private readonly eventsService: EventsService) {}

  @Mutation(() => Event)
  async createEvent(@Args('createEventInput') createEventInput: EventsDto) : Promise<EventsEntity>{
    return await this.eventsService.createEvent(createEventInput);
  }

  @Query(() => [Event], { name: 'events' })
  async findAll() : Promise<EventsEntity[]> {
    return await this.eventsService.getAll();
  }

  @Query(() => Event, { name: 'event' })
  async findOne(@Args('id', { type: () => Int }) id: number) :Promise<EventsEntity>{
    return await this.eventsService.getOne(id);
  }

  @Query(() => [Event], {name: "bylocation"})
  async findByLocation(@Args("location") location: string) : Promise<EventsEntity[] | string>{
    return await this.eventsService.getByLocation(location)
  }

  @Query(() => [Event], {name: "bytime"})
  async findByTime(@Args("from") from: string, @Args("to") to: string) : Promise<EventsEntity[] | string> {
    return await this.eventsService.getByTime(from,to)
  }
  
  @Mutation(() => Event)
  async updateEvent(@Args("id") id: number, @Args('updateEventInput') updateEventInput: updEventsDto): Promise<EventsEntity | string> {
    return await this.eventsService.updateEvent(id, updateEventInput);
  }

  @Mutation(() => Event)
  async removeEvent(@Args('id', { type: () => Int }) id: number) : Promise<EventsEntity | string> {
    return await this.eventsService.deleteEvent(id);
  }
}
