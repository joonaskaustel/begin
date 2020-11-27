import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserEntity} from './user/user.entity';
import {AuthModule} from './auth/auth.module';
import {UserModule} from './user/user.module';
import {ConfigModule} from '@nestjs/config';
import {TimerModule} from './timer/timer.module';
import {TimerEntity} from './timer/timer.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            // type: 'mysql', // i used mysql for testing
            // host: 'localhost',
            // port: 3306,
            // username: 'root',
            // password: 'password',
            database: 'begin',
            entities: [UserEntity, TimerEntity],
            synchronize: true,
        }),
        AuthModule,
        UserModule,
        TimerModule,
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
