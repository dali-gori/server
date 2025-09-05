import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { JwtStrategy } from './jwt.strategy';

// Remove static constant - will be resolved at runtime in JwtModule.registerAsync

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            useFactory: () => ({
                global: true,
                secret: process.env.JWT_SECRET || 'dev-secret-change-me',
                signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1d' },
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, UsersService, JwtStrategy],
    exports: [AuthService, JwtStrategy],
})
export class AuthModule {}