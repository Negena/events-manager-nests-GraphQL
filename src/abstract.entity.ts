import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToMany, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

export class AbstractEntity<T>{
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    constructor(entity: Partial<T>){
        Object.assign(this, entity)
    }
}