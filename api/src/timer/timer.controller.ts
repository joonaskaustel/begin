import {Body, Controller, Post, UseGuards, Request, Get, Query, Put, Param} from '@nestjs/common';
import {TimerService} from './timer.service';
import {TimerStartDto} from './dto/timer.start.dto';
import {TimerResponseDto} from './dto/timer.response.dto';
import {JwtAuthGuard} from '../auth/guards/jwt.auth,guard';
import {TimerStopDto} from './dto/timer.stop.dto';
import {TimerListQueryDto} from './dto/timer.list.query.dto';
import {TimerUpdateQueryDto} from './dto/timer.update.query.dto';

@Controller('timer')
export class TimerController {

    constructor(
        private readonly timerService: TimerService,
    ) {
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async startTimer(@Body() body: TimerStartDto, @Request() req): Promise<TimerResponseDto> {
        return this.timerService.startTimer(body, req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('stop')
    async stopTimer(@Body() body: TimerStopDto, @Request() req): Promise<TimerResponseDto> {
        return this.timerService.stopTimer(body.timerId, req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('list')
    async getUserTimers(@Query() params: TimerListQueryDto, @Request() req): Promise<TimerResponseDto[]> {
        return this.timerService.getTimers(req.user.userId, params);
    }

    @UseGuards(JwtAuthGuard)
    @Get('total')
    async getTotalTimeSpent(@Query() params: TimerListQueryDto, @Request() req): Promise<{ total: string }> {
        return this.timerService.getTotalTimeSpent(req.user.userId, params);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':timerId')
    async updateTimerById(
        @Param('timerId') timerId: number,
        @Body() body: TimerUpdateQueryDto,
        @Request() req,
    ): Promise<TimerResponseDto> {
        return this.timerService.updateTimerById(req.user.userId, timerId, body);
    }

}
