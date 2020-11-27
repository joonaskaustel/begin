import {EntityRepository, Repository} from 'typeorm';
import {TimerEntity} from './timer.entity';

@EntityRepository(TimerEntity)
export class TimerRepository extends Repository<TimerEntity> {
}
