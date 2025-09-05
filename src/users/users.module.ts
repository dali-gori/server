import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
    // imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}