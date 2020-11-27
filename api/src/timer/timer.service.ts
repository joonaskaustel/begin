import {BadRequestException, ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, SelectQueryBuilder} from 'typeorm';
import {TimerEntity} from './timer.entity';
import {TimerFactory} from './timer.factory';
import {TimerStartDto} from './dto/timer.start.dto';
import {TimerResponseDto} from './dto/timer.response.dto';
import {UserService} from '../user/user.service';
import {TimerListQueryDto} from './dto/timer.list.query.dto';
import {TimerUpdateQueryDto} from './dto/timer.update.query.dto';
import {DateTime} from 'luxon';

@Injectable()
export class TimerService {
    private alias = 't';

    constructor(
        @InjectRepository(TimerEntity)
        private timerEntityRepository: Repository<TimerEntity>,
        private timerFactory: TimerFactory,
        private userService: UserService,
    ) {
    }

    async queryBuilder(): Promise<SelectQueryBuilder<TimerEntity>> {
        return this.timerEntityRepository.createQueryBuilder(this.alias)
            .leftJoinAndSelect(`${this.alias}.user`, 'u');
    }

    async findOneById(timerId: number): Promise<TimerEntity> {
        const qb = await this.queryBuilder();
        return qb.where(`${this.alias}.id = :id`, { id: timerId }).getOne();
    }

    async findTimersByUserId(userId: number, params: TimerListQueryDto): Promise<TimerEntity[]> {
        const qb = await this.queryBuilder();

        qb.andWhere(`u.id = :userId`, { userId })
            .orderBy(`${this.alias}.start`, 'DESC');

        if (params.title) {
            qb.andWhere(`${this.alias}.title like :title`, { title: `%${params.title}%` });
        }

        return qb.getMany();
    }

    async startTimer(body: TimerStartDto, creatorId: number): Promise<TimerResponseDto> {
        // get user
        const creator = await this.userService.findOneById(creatorId);

        // use factory for better organization
        const newTimer = await this.timerFactory.newTimer(body, creator);

        // return only neede values from dto
        return TimerResponseDto.fromTimer(await this.timerEntityRepository.save(newTimer));
    }

    async stopTimer(timerId: number, creatorId: number): Promise<TimerResponseDto> {
        const timerFound = await this.getUserTimer(timerId, creatorId);

        // stop timer by setting end property
        timerFound.end = new Date();

        // return only needed values from dto
        return TimerResponseDto.fromTimer(await this.timerEntityRepository.save(timerFound));
    }

    async getTimers(creatorId: number, params?: TimerListQueryDto): Promise<TimerResponseDto[]> {
        // get user
        const creator = await this.userService.findOneById(creatorId);

        if (!creator) {
            throw new NotFoundException('User not found');
        }

        // get timers by creator id
        const timers = await this.findTimersByUserId(creator.id, params);

        // return only needed values from dto
        return timers.map((t) => TimerResponseDto.fromTimer(t));
    }

    async getTotalTimeSpent(creatorId: number, params: TimerListQueryDto): Promise<{ total: string }> {
        const timers = await this.getTimers(creatorId, params);

        // faster and easier solution i think
        let duration = 0;
        timers.forEach((t) => {
            if (!t.end) {
                return;
            }
            return duration += t.end.getTime() - t.start.getTime();
        });

        // more complex solution
        // timer arr contains ms's, remove null values with lodash compact
        // const times = compact(timers.map((t) => {
        //     if (!t.end) {
        //         return;
        //     }
        //     return t.end.getTime() - t.start.getTime();
        // }));
        // const totalTimeSpent = times.reduce((acc, curr) => {
        //     return acc += curr;
        // });

        const formattedTotal = new Date(duration).toISOString().slice(11, -1);

        // returning with second accuracy
        return { total: formattedTotal };
    }

    async updateTimerById(creatorId: number, timerId: number, body: TimerUpdateQueryDto): Promise<TimerResponseDto> {
        const timerFound = await this.getUserTimer(timerId, creatorId);

        if (body.title) {
            timerFound.title = body.title;
        }

        // maybe this could be solved in the dto
        if (body.end && body.start) {
            if (new Date(body.end).getTime() - new Date(body.start).getTime() < 0) {
                throw new BadRequestException('End cannot before start');
            }
        }

        if (body.start) {
            if (DateTime.fromISO(body.start).isValid) {
                timerFound.start = new Date(body.start);
            } else {
                throw new BadRequestException('Invalid start date');
            }
        }

        if (body.end) {
            if (DateTime.fromISO(body.end).isValid) {
                timerFound.end = new Date(body.end);
            } else {
                throw new BadRequestException('Invalid start date');
            }
        }

        return TimerResponseDto.fromTimer(await this.timerEntityRepository.save(timerFound));
    }

    async getUserTimer(timerId: number, userId: number): Promise<TimerEntity> {
        // get user
        const creator = await this.userService.findOneById(userId);

        if (!creator) {
            throw new NotFoundException('User not found');
        }

        // check if that timer belongs to user
        const timerFound = await this.findOneById(timerId);

        if (!timerFound) {
            throw new NotFoundException('Timer not found');
        }

        if (timerFound.user.id !== creator.id) {
            throw new ForbiddenException('This timer does not belong to user who initiated request');
        }

        return timerFound;
    }
}
