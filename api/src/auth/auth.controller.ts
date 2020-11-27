import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from './auth.service';
import {LoginResponseDto} from './dto/login.response.dto';
import {LoginPostDto} from './dto/login.post.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) {
    }

    @Post('login')
    login(@Body() body: LoginPostDto): Promise<LoginResponseDto> {
        return this.authService.login(body);
    }

}
