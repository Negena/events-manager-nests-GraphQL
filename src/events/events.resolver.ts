import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EventsService } from './events.service';
import {EventsEntity as Event, EventsEntity } from './entities/event.entity';
import { EventsDto} from './dto/create-event.input';
import { LocationEntity } from 'src/events/entities/location.entity';
import { updEventsDto } from './dto/update-event.dto';
import { LocationDto } from './dto/create-location.input';
import { updLocationDto } from './dto/update-location.dto';

@Resolver(() => Event)
export class EventsResolver {
  constructor(private readonly eventsService: EventsService) {}

  @Mutation(() => Event)
  createEvent(@Args('createEventInput') createEventInput: EventsDto) {
   this.eventsService.postEvent()
    return this.eventsService.createEvent(createEventInput);
  }

  @Query(() => [Event], { name: 'events' })
  findAll() : Promise<EventsEntity[]> {
    return this.eventsService.getAll();
  }

  @Query(() => Event, { name: 'event' })
  findOne(@Args('id', { type: () => Int }) id: number){
    return this.eventsService.getOne(id);
  } 

  @Query(() => [Event], {name: "bylocation"})
  findByLocation(@Args("location") location: string){
    return this.eventsService.getByLocation(location)
  }

  @Query(() => [Event], {name: "bytime"})
  findByTime(@Args("from") from: string, @Args("to") to: string){
    return this.eventsService.getByTime(from,to)
  }
  
  @Mutation(() => Event)
  updateEvent(@Args("id") id: number, @Args('updateEventInput') updateEventInput: updEventsDto){
    return this.eventsService.updateEvent(id, updateEventInput);
  }

  @Mutation(() => Event)
  removeEvent(@Args('id', { type: () => Int }) id: number){
    return this.eventsService.deleteEvent(id);
  }

  @Query(() => [Event], { name: 'available' })
  getAvailable() {
    return this.eventsService.getAvailable();
  }

  @Query(() => [Event], { name: 'address' })
  getByAddress(@Args('address') address: string){
    return this.eventsService.getByAddress(address);
  }

  @Query(() => [Event], { name: 'locations' })
  findEvents(){
    return this.eventsService.getAllLocations();
  } 

  @Mutation(() => Event)
  removeByLocation(@Args('id', { type: () => Int }) id: number){
    return this.eventsService.deleteByLocation(id);
  }
}
