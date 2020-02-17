import { Controller, Get, Param, Res, HttpStatus, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../interfaces/user.interface';

@Controller('users')
export class UsersController {

    constructor(private service: UsersService) {}

    @Get()
    async findAll(@Res() res): Promise<User[]> {
        const x = await this.service.findAll();
        return res.status(HttpStatus.OK).json(x);
    }

    @Get(':id')
    async findOne(@Res() res, @Param('id') id): Promise<User> {
        const x = await this.service.findOne(id);
        return res.status(HttpStatus.OK).json(x);
    }

    @Post()
    async create(@Body() x: User): Promise<User> {
        this.service.create(x);
        return x;
    }
}
