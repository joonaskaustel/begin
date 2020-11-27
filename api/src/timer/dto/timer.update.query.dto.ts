import {IsDateString, IsOptional, IsString} from 'class-validator';

export class TimerUpdateQueryDto {
    @IsString()
    @IsOptional()
    title: string;

    @IsDateString()
    @IsOptional()
    start: string;

    @IsDateString()
    @IsOptional()
    end: string;
}
