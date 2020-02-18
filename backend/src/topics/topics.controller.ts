import { Controller, Get, Res, HttpStatus, Param, Delete, Post, Body } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicType } from '../interfaces/topic.interface';

@Controller('topics')
export class TopicsController {

    constructor(private service: TopicsService) {}

    @Get()
    async findAll(@Res() res): Promise<TopicType[]> {
        try {
            const x = await this.service.findAll();
            return res.status(HttpStatus.OK).json(x);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @Get(':id')
    async findTask(@Res() res, @Param('id') id): Promise<TopicType[]> {
        try {
            const x = await this.service.findTask(id);
            return res.status(HttpStatus.OK).json(x);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @Post()
    async create(@Res() res, @Body() x: TopicType): Promise<TopicType> {
        try {
            const r = await this.service.create(x);
            return res.status(HttpStatus.OK).json(r);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @Delete(':id')
    async delete(@Res() res, @Param('id') id): Promise<TopicType> {
        try {
            const x = await this.service.delete(id);
            return res.status(HttpStatus.OK).json(x);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }
}
