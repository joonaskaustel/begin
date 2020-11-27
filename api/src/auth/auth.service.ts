import {Injectable, NotFoundException} from '@nestjs/common';
import {UserService} from '../user/user.service';
import * as argon2 from 'argon2';
import {JwtService} from '@nestjs/jwt';
import {LoginResponseDto} from './dto/login.response.dto';
import {LoginPostDto} from './dto/login.post.dto';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {
    }

    async login(body: LoginPostDto): Promise<LoginResponseDto> {
        // find user with email
        const userExists = await this.userService.findOneByEmail(body.email);

        if (!userExists) {
            throw new NotFoundException('Email or password is wrong');
        }

        // compare passwords
        const passwordMatch = await argon2.verify(userExists.password, body.password);

        if (!passwordMatch) {
            throw new NotFoundException('Email or password is wrong');
        }

        // generate and return token
        const payload = { email: userExists.email, userId: userExists.id };

        return {
            user: {
                firstName: userExists.firstName,
                lastName: userExists.lastName,
                email: userExists.email,
            },
            accessToken: this.jwtService.sign(payload),
        };
    }
}
