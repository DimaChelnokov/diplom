import { Controller, Get, Param, Res, HttpStatus, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../interfaces/user.interface';

@Controller('users')
export class UsersController {

    constructor(private service: UsersService) {}

    @Get()
    async findAll(@Res() res): Promise<any[]> {
        const users = await this.service.findAll();
        return res.status(HttpStatus.OK).json(users);
    }

    @Get(':id')
    async findOne(@Res() res, @Param('id') id): Promise<any> {
        const user = await this.service.findOne(id);
        return res.status(HttpStatus.OK).json(user);
    }

    @Post()
    create(@Body() user: User) {
        this.service.create(user);
        return user;
    }
}
