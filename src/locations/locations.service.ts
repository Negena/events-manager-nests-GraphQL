import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { updEventsDto } from 'src/events/dto/update-event.dto';
import { EntityManager, Repository } from 'typeorm';
import { LocationDto } from './dto/create-location.input';
import { updLocationDto } from './dto/update-location.dto';
import { LocationEntity } from './entities/location.entity';

@Injectable()
export class LocationsService {
  constructor(@InjectRepository(LocationEntity)
    private readonly locationRepo: Repository<LocationEntity>,
    private readonly entityManager: EntityManager){}

    async getAll(): Promise<LocationEntity[]>{
        return await this.locationRepo.find()
    }

    async getAvailable(): Promise<LocationEntity[] | string>{
       const availabile = await this.locationRepo.find({
         where: {availability: true}
        })
        if (availabile)  {
            return availabile
        }
        return "not found"
    }

    async getByAddress(address: string): Promise<LocationEntity[] | string> {
        return await this.locationRepo.find({
          where: {
              address : address
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

}
