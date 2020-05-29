import { IsEmail, IsNotEmpty, IsDateString, IsNumberString, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class ClientDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    gender: string;

    @IsNotEmpty()
    @IsNumberString()
    phone: number;

    @IsEmail()
    email: string

    // @IsDateString()
    // @Type(() => Date)
    // dob: Date
}