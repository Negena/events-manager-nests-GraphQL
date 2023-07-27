import { AbstractEntity } from 'src/abstract.entity';
import { LocationEntity } from 'src/locations/entities/location.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToMany, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class EventsEntity extends AbstractEntity<EventsEntity>{

    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column()
    @Field()
    startAt: string

    @Column()
    @Field()
    endAt: string

    @Column()
    @Field()
    name:string

    @Column()
    @Field()
    description: string

    @OneToOne(() => LocationEntity, {cascade: true})
    @JoinColumn()
    @Field(type => LocationEntity)
    location: LocationEntity
} 