import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { JwtStrategy } from './jwt.strategy';

const JWT_SECRET = process.env.JWT_SECRET ?? 'dev-secret-change-me';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret: JWT_SECRET,
            signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1d' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, UsersService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}