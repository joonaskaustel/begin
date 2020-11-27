import {Body, Controller, Post} from '@nestjs/common';
import {UserService} from './user.service';
import {UserResponseDto} from './dto/user.response.dto';
import {UserPostDto} from './dto/user.post.dto';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService,
    ) {
    }

    @Post('register-user')
    async register(@Body() body: UserPostDto): Promise<UserResponseDto> {
        return this.userService.registerUser(body);
    }
}
