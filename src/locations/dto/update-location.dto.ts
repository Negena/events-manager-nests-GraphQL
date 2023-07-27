import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString, minLength } from "class-validator"
import { IsAlpha } from 'class-validator';
import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class updLocationDto{

    @IsNotEmpty()
    @IsString()
    @Field()
    country: string;

    @IsNotEmpty()
    @IsString()
    @Field()
    city: string;

    @IsNotEmpty()
    @IsString()
    @Field()
    address: string;

    @IsNotEmpty()
    @IsBoolean()
    @Field()
    availability: boolean;
}