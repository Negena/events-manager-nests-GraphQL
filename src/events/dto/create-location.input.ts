import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString, IS_ALPHA, minLength } from "class-validator"
import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class LocationDto{
    
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