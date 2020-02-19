import { Controller, Get, Res, HttpStatus, Param, Delete, Post, Body, Put } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupType } from '../interfaces/group.interface';
import { ApiBody, ApiOkResponse, ApiInternalServerErrorResponse, ApiParam } from '@nestjs/swagger';

@Controller('groups')
export class GroupsController {

    constructor(private service: GroupsService) {}

    @Get()
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async findAll(@Res() res): Promise<GroupType[]> {
        try {
            const x = await this.service.findAll();
            return res.status(HttpStatus.OK).json(x);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @Get(':id')
    @ApiParam({ name: 'id', type: 'number', description: 'Group ID', required: true})
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async findOne(@Res() res, @Param('id') id): Promise<GroupType> {
        try {
            const x = await this.service.findOne(id);
            return res.status(HttpStatus.OK).json(x);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @Post()
    @ApiBody({ type: [GroupType] })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async create(@Res() res, @Body() x: GroupType): Promise<GroupType> {
        try {
            const r = await this.service.update(x);
            return res.status(HttpStatus.OK).json(r);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @Delete(':id')
    @ApiParam({ name: 'id', type: 'number', description: 'Group ID', required: true})
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async delete(@Res() res, @Param('id') id): Promise<GroupType> {
        try {
            const x = await this.service.delete(id);
            return res.status(HttpStatus.OK).json(x);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }
}
