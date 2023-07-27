import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, EntityManager, Repository } from 'typeorm';
import { EventsDto } from './dto/create-event.input';
import { EventsEntity } from './entities/event.entity';
import { LocationEntity } from 'src/locations/entities/location.entity';
import { updEventsDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(
        @InjectRepository(EventsEntity)
    private eventsRepo: Repository<EventsEntity>,
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

    async updateEvent(id: number, event: updEventsDto): Promise<EventsEntity | string>{
        const updateEvent = await this.eventsRepo.update(id, event)
        if (updateEvent){
        return await this.eventsRepo.findOne({where: {id}})
        }
        else return "not found"
       
    }

    async deleteEvent(id: number): Promise<EventsEntity | string>   {
        const event = await this.eventsRepo.findOne({where: {id}})
        if (event){
        await this.eventsRepo.remove(event) 
        return await event
        }
        return "not found"
    }
}
