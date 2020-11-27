import {UserEntity} from './user.entity';
import * as argon2 from 'argon2';
import {UserPostDto} from './dto/user.post.dto';

export class UserFactory {
    public async newUser(user: UserPostDto) {
        const newUser = new UserEntity();

        newUser.firstName = user.firstName;
        newUser.lastName = user.lastName;
        newUser.email = user.email;
        newUser.password = await argon2.hash(user.password);

        return newUser;
    }
}
