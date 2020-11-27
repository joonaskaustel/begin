import {IsNotEmpty, IsString} from 'class-validator';

export class TimerStartDto {
    @IsString()
    @IsNotEmpty()
    title: string;
}
