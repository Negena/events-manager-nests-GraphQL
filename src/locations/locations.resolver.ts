import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LocationsService } from './locations.service';
import { LocationEntity as Location, LocationEntity} from './entities/location.entity';
import { LocationDto } from './dto/create-location.input';
import { updLocationDto } from './dto/update-location.dto';

@Resolver(() => Location)
export class LocationsResolver {
  constructor(private readonly locationsService: LocationsService) {}

  @Mutation(() => Location)
  async createLocation(@Args('createLocationInput') createLocationInput: LocationDto): Promise<LocationEntity> {
   return await  this.locationsService.createLocation(createLocationInput);
  }

  @Query(() => [Location], { name: 'locations' })
  async findEvents() : Promise<LocationEntity[]>{
    return await  this.locationsService.getAll();
  }

  @Query(() => [Location], { name: 'address' })
  async getByAddress(@Args('address') address: string) : Promise<LocationEntity[] | string> {
    return await this.locationsService.getByAddress(address);
  }

  @Query(() => [Location], { name: 'available' })
  async getAvailable() {
    return await this.locationsService.getAvailable();
  }

  @Mutation(() => Location)
  async updateLocation(@Args("id") id: number,@Args('updateLocationInput') updateLocationInput: updLocationDto) : Promise<LocationEntity>{
    return await this.locationsService.updateLocation(id, updateLocationInput);
  }

  @Mutation(() => Location)
  async removeLocation(@Args('id', { type: () => Int }) id: number) {
    return await this.locationsService.deleteLocation(id);
  }
}
