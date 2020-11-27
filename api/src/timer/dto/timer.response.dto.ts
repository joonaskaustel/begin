import {Exclude, Expose, plainToClass} from 'class-transformer';
import {TimerEntity} from '../timer.entity';

@Exclude()
export class TimerResponseDto {
    @Expose()
    id: number;

    @Expose()
    title: string;

    @Expose()
    start: Date;

    @Expose()
    end: Date;

    static fromTimer(timer: TimerEntity): TimerResponseDto {
        return plainToClass(TimerResponseDto, timer);
    }
}
