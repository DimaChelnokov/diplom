import { Controller, Get, Res, HttpStatus, Param, Post, Body, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskType } from '../interfaces/task.interface';

@Controller('tasks')
export class TasksController {

    constructor(private service: TasksService) {}

    @Get()
    async findAll(@Res() res): Promise<TaskType[]> {
        try {
            const x = await this.service.findAll();
            return res.status(HttpStatus.OK).json(x);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @Get(':id')
    async findOne(@Res() res, @Param('id') id): Promise<TaskType> {
        try {
            const x = await this.service.findOne(id);
            return res.status(HttpStatus.OK).json(x);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @Post()
    async create(@Res() res, @Body() x: TaskType): Promise<TaskType> {
        try {
            const r = await this.service.create(x);
            return res.status(HttpStatus.OK).json(r);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @Delete(':id')
    async delete(@Res() res, @Param('id') id): Promise<TaskType> {
        try {
            const x = await this.service.delete(id);
            return res.status(HttpStatus.OK).json(x);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }
}
