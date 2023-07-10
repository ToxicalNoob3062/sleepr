import { CreateUserDto } from './dtos/create-user.dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Post()
    async createUser(@Body() user: CreateUserDto) {
        return this;
    }
}
