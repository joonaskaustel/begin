import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserEntity} from './user.entity';
import {UserService} from './user.service';
import {UserRepository} from './user.repository';
import {UserController} from './user.controller';
import {UserFactory} from './user.factory';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [UserService, UserRepository, UserFactory],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {
}
