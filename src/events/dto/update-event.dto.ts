import { IsDate, IsNotEmpty, IsString, minLength } from "class-validator"
import { LocationDto } from "src/events/dto/create-location.input";
import { isDate } from "util/types";
import { IsAlpha } from 'class-validator';
import { InputType, Int, Field } from '@nestjs/graphql';
import { updLocationDto } from "./update-location.dto";

@InputType()
export class updEventsDto{

    @IsNotEmpty()
    @IsString()
    @Field()
    startAt: string;

    @IsNotEmpty()
    @IsString()
    @Field()
    endAt: string;

    @IsNotEmpty()
    @IsString()
    @Field()
    name: string;

    @IsNotEmpty()
    @IsString()
    @Field()
    description: string;
    
    @IsNotEmpty()
    @Field()
    location: updLocationDto;
}