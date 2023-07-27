import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {join} from "path"
import { EventsModule } from './events/events.module';
import {TypeOrmModule} from "@nestjs/typeorm"
import { EventsEntity } from './events/entities/event.entity';
import { typeOrmConfig } from './config/typeorm.config';
import {ConfigModule} from "@nestjs/config"
import { LocationsModule } from './locations/locations.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: "localhost", 
        port: 6379,
      }
    }), 
    BullModule.registerQueue({
      name: "transcode"
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    ConfigModule.forRoot({isGlobal: true}),
    EventsModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    LocationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
