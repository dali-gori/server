import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { UsersService } from '../users/users.service';
import {User} from "../users/user.entity";


// constants to seed defaults — in a real app, read them after seeding
const DEFAULT_ROLE_ID = Number(process.env.DEFAULT_ROLE_ID ?? 1); // "User"
const DEFAULT_SUBSCRIPTION_ID = Number(process.env.DEFAULT_SUBSCRIPTION_ID ?? 1); // "free"


@Injectable()
export class AuthService {
    constructor(
        private users: UsersService,
        private jwt: JwtService
    ) {}


    async register(input: { name: string; email: string; password: string; phoneNumber?: string }) {
        const email = input.email.trim().toLowerCase();
        const existing = await this.users.findByEmail(email);
        if (existing) throw new BadRequestException('Email already in use');

        const passwordHash = await argon2.hash(input.password);

        const user = await this.users.createUser({
            name: input.name.trim(),
            email,
            password: passwordHash,
            phoneNumber: input.phoneNumber ?? null,
            roleId: DEFAULT_ROLE_ID,
            subscriptionId: DEFAULT_SUBSCRIPTION_ID,
        });


        return this.buildAuthResponse(user);
    }


    async login(emailRaw: string, password: string) {
        const email = emailRaw.trim().toLowerCase();
        const user = await this.users.findByEmail(email);
        if (!user) throw new UnauthorizedException('Invalid credentials');

        const ok = await argon2.verify(user.password, password);
        if (!ok) throw new UnauthorizedException('Invalid credentials');

        return this.buildAuthResponse(user);
    }


    private async buildAuthResponse(user: User) {
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.roleId,
        };
        const accessToken = this.jwt.sign(payload);
        return { accessToken };
    }
}