import { IsEmail, IsNotEmpty, IsNumberString,IsDate } from 'class-validator';
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

    @IsDate()
    @Type(() => Date)
    dob: Date

    @IsNotEmpty()
    mode_of_contact: string

    address: string
    nationality: string
    education_background: string

}