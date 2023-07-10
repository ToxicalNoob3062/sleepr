import { CreateUserDto } from './dtos/create-user.dto';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UsersRepository) { }
    async create(user: CreateUserDto) {
        return this.userRepository.create(user);
    }
}
