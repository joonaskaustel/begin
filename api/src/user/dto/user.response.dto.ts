import {UserEntity} from '../user.entity';
import {Exclude, Expose, plainToClass} from 'class-transformer';

@Exclude()
export class UserResponseDto {
    @Expose()
    firstName: string;

    @Expose()
    lastName: string;

    @Expose()
    email: string;

    @Expose()
    isActive: string;

    static fromUser(user: UserEntity): UserResponseDto {
        return plainToClass(UserResponseDto, user);
    }
}
