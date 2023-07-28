import { AbstractEntity } from 'src/abstract.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToMany, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class LocationEntity extends AbstractEntity<LocationEntity>{

    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column()
    @Field()
    country: string

    @Column()
    @Field()
    city: string

    @Column()
    @Field()
    address:string

    @Column()
    @Field()
    availability: boolean 
}