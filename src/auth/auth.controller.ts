import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/registerInputModel.dto';
import { LoginDto } from './dtos/loginInputModel.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CurrentUser } from './current-user.decorator';
import {UsersService} from "../users/users.service";


@Controller('auth')
export class AuthController {
    constructor(
        private auth: AuthService,
        private users: UsersService) {}

    @Post('register')
    async register(@Body() dto: RegisterDto) {
        return this.auth.register(dto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() dto: LoginDto) {
        return this.auth.login(dto.email, dto.password);
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    async logout() {
        return { success: true };
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async meFull(@CurrentUser() user: { userId: number }) {
        const u = await this.users.findById(user.userId);
        if (!u) return null;
        const { password, ...safe } = u;
        return safe;
    }
}