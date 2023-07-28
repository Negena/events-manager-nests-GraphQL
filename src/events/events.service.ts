import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, EntityManager, Repository } from 'typeorm';
import { EventsDto } from './dto/create-event.input';
import { EventsEntity } from './entities/event.entity';
import { LocationEntity } from 'src/events/entities/location.entity';
import { updEventsDto } from './dto/update-event.dto';
import { LocationDto } from './dto/create-location.input';
import { updLocationDto } from './dto/update-location.dto';
import { InjectQueue } from '@nestjs/bull';
import { EventsConsumer } from './consumers/events.consumer';
import { transcode } from 'env';
import { Queue } from 'bull';

@Injectable()
export class EventsService {
  constructor(
      @InjectQueue(transcode) private readonly transcodeQueue:Queue,
    @InjectRepository(EventsEntity)  private readonly eventsRepo: Repository<EventsEntity>,
    @InjectRepository(LocationEntity) private readonly locationRepo: Repository<LocationEntity>,
    private readonly entityManager: EntityManager
    ){}

  async getAll(): Promise<EventsEntity[]>{
      return await this.eventsRepo.find({
          relations: ["location"]
      })    
    }

    async getOne(id: number): Promise<EventsEntity>{
        return await this.eventsRepo.findOne({
            relations:["location"],
            where: {id}
        })
    }

    async getByTime(from: string, to: string) : Promise<EventsEntity[] | string>{
        const events = await this.eventsRepo.find({where: {
            startAt: Between(
                from, to
            )
        }})
        if (events) {
            return events
        }
        return "not found"
    }
 
    async getByLocation(city: string): Promise<EventsEntity[] | string>{
        const events = this.eventsRepo.find({
            relations: ["location"], 
            where: {
              location: {
                city: city
              }
            }
        })
        if (events) {
            return events
        }
        return city
    }

    async createEvent(event: EventsDto) : Promise<EventsEntity>{
        const location = await new LocationEntity({
           ...event.location
        })

        const newEvent = await new EventsEntity({
            ...event,
            location
        })

        return await this.entityManager.save(newEvent)
    }

   
    async updateEvent(id: number, event: updEventsDto): Promise<EventsEntity>{
        const f = await this.eventsRepo.findOne({where: {id}, relations: ["location"]})
        return this.eventsRepo.save({id, ...event})
    }


    async deleteEvent(id: number): Promise<EventsEntity | string>   {
        const event = await this.eventsRepo.findOne({where: {id}})
        if (event){
            await this.eventsRepo.remove(event) 
            return await event
        }
        return "not found"
    } 

async getAllLocations(): Promise<EventsEntity[]>{
        return await this.eventsRepo.find({
            relations: ["location"]
        })
    }

    async getAvailable(): Promise<EventsEntity[] | string>{
        const available = this.eventsRepo.find({
            relations: ["location"], 
            where: {
              location: {
                availability: true
              }
            }
        })
    
        if (available) {
            return available
        }
        return available
    }


    async getByAddress(address: string): Promise<EventsEntity[] | string> {
        return await this.eventsRepo.find({
        relations: ["location"],
        where: {
            location: {
                address : address
            }
        }
        })
    } 

    async createLocation(location: LocationDto): Promise<LocationEntity>{
        const newLocation = new LocationEntity(location)
        return await this.entityManager.save(newLocation)
    }

    async deleteLocation(id: number) : Promise<LocationEntity | string>{
        const del = await this.locationRepo.findOne({where: {id}})
        if (del) {
            await this.locationRepo.delete(del)
            return del 
        }
        return "not found"
    }

    async updateLocation(id: number, location: updLocationDto) : Promise<LocationEntity> {
        const updLocation = await this.locationRepo.update(id, location)
        return await this.locationRepo.findOne({where: {id}})
    }

    async deleteByLocation(id: number): Promise<EventsEntity | string>   {
        const event = await this.eventsRepo.findOne({
            relations: ["location"],
            where: {
                location: {
                    id: id
                }
            }})
        if (event){
            await this.eventsRepo.remove(event) 
            return await event
        }
        return "not found"
    }

    async postEvent(){
        await this.transcodeQueue.add({
            response: "posts were added"
        })
    }
}
