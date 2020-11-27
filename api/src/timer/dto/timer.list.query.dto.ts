import {IsOptional, IsString} from 'class-validator';

export class TimerListQueryDto {
    @IsString()
    @IsOptional()
    title: string;
}
