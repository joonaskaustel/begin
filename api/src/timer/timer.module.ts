import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {TimerEntity} from './timer.entity';
import {TimerFactory} from './timer.factory';
import {TimerService} from './timer.service';
import {TimerController} from './timer.controller';
import {TimerRepository} from './timer.repository';
import {UserModule} from '../user/user.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([TimerEntity]),
        UserModule,
    ],
    providers: [TimerService, TimerRepository, TimerFactory],
    controllers: [TimerController],
    exports: [TimerService],
})
export class TimerModule {
}
