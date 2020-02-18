import { Controller, Get, Res, HttpStatus, Param, Delete, Post, Body, Put } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupType } from '../interfaces/group.interface';

@Controller('groups')
export class GroupsController {

    constructor(private service: GroupsService) {}

    @Get()
    async findAll(@Res() res): Promise<GroupType[]> {
        const x = await this.service.findAll();
        return res.status(HttpStatus.OK).json(x);
    }

    @Get(':id')
    async findOne(@Res() res, @Param('id') id): Promise<GroupType> {
        try {
            const x = await this.service.findOne(id);
            return res.status(HttpStatus.OK).json(x);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
        }
    }

    @Post()
    async create(@Res() res, @Body() x: GroupType): Promise<GroupType> {
        try {
            const r = await this.service.update(x);
            return res.status(HttpStatus.OK).json(r);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
        }
    }

    @Delete(':id')
    async delete(@Res() res, @Param('id') id): Promise<GroupType> {
        const x = await this.service.delete(id);
        return res.status(HttpStatus.OK).json(x);
    }
}
