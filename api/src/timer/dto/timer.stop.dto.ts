import {IsNumber} from 'class-validator';

export class TimerStopDto {
    @IsNumber()
    timerId: number;
}
