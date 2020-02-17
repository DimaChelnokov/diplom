import { Controller, Get, Res, HttpStatus, Param, Delete } from '@nestjs/common';
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
        const x = await this.service.findOne(id);
        return res.status(HttpStatus.OK).json(x);
    }

    @Delete(':id')
    async delete(@Res() res, @Param('id') id): Promise<GroupType> {
        const x = await this.service.delete(id);
        return res.status(HttpStatus.OK).json(x);
    }
}
