import { Controller, Get, Res, HttpStatus, Param, Post, Body, Delete } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemType } from '../interfaces/item.interface';
import { ApiBody, ApiOkResponse, ApiInternalServerErrorResponse, ApiParam } from '@nestjs/swagger';

@Controller('items')
export class ItemsController {

    constructor(private service: ItemsService) {}

    @Get()
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async findAll(@Res() res): Promise<ItemType[]> {
        try {
            const x = await this.service.findAll();
            return res.status(HttpStatus.OK).json(x);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @Get(':id')
    @ApiParam({ name: 'id', type: 'number', description: 'Item ID', required: true})
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async findTopic(@Res() res, @Param('id') id): Promise<ItemType[]> {
        try {
            const x = await this.service.findTopics(id);
            return res.status(HttpStatus.OK).json(x);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @Post()
    @ApiBody({ type: [ItemType] })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async create(@Res() res, @Body() x: ItemType): Promise<ItemType> {
        try {
            const r = await this.service.create(x);
            return res.status(HttpStatus.OK).json(r);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @Delete(':id')
    @ApiParam({ name: 'id', type: 'number', description: 'Item ID', required: true})
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async delete(@Res() res, @Param('id') id): Promise<ItemType> {
        try {
            const x = await this.service.delete(id);
            return res.status(HttpStatus.OK).json(x);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }
}
