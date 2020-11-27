import {ConflictException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UserEntity} from './user.entity';
import {UserFactory} from './user.factory';
import {UserResponseDto} from './dto/user.response.dto';
import {UserPostDto} from './dto/user.post.dto';

@Injectable()
export class UserService{

    constructor(
        @InjectRepository(UserEntity)
        private userEntityRepository: Repository<UserEntity>,
        private userFactory: UserFactory,
    ) {
    }

    findOneByEmail(email: string): Promise<UserEntity> {
        return this.userEntityRepository.findOne({ email });
    }

    findOneById(userId: number): Promise<UserEntity> {
        return this.userEntityRepository.findOne({ id: userId });
    }

    async registerUser(body: UserPostDto): Promise<UserResponseDto> {
        // check if email already exists
        const userExists = await this.findOneByEmail(body.email);

        if (userExists) {
            throw new ConflictException('User with this email exists');
        }

        // use factory for better organization
        const newUser = await this.userFactory.newUser(body);

        // return only needed values from dto
        return UserResponseDto.fromUser(await this.userEntityRepository.save(newUser));
    }
}
