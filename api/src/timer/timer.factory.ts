import {TimerEntity} from './timer.entity';
import {TimerStartDto} from './dto/timer.start.dto';
import {UserEntity} from '../user/user.entity';

export class TimerFactory {
    public async newTimer(timer: TimerStartDto, creator: UserEntity) {
        const newTimer = new TimerEntity();

        newTimer.title = timer.title;
        newTimer.start = new Date();
        newTimer.user = creator;

        return newTimer;
    }
}
