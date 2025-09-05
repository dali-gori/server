import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';


@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {}

    findByEmail(email: string) {
        return this.repo.findOne({ where: { email } });
    }

    async createUser(data: Partial<User>) {
        const user = this.repo.create(data);
        return this.repo.save(user);
    }

    async findById(id: number) {
        return this.repo.findOne({ where: { id } });
    }

    async findByEmailWithRole(email: string) {
        return this.repo.findOne({
            where: { email },
            relations: ['role'],   // 👈 ensures we get role info
        });
    }
}