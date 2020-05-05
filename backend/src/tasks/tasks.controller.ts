import { Controller, Get, Res, HttpStatus, Param, Delete, UseGuards, Req, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ApiOkResponse, ApiInternalServerErrorResponse, ApiUnauthorizedResponse, ApiSecurity, ApiForbiddenResponse, ApiNotFoundResponse, ApiCreatedResponse, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { LogService } from '../log/log.service';
import { TaskType } from '../interfaces/task.interface';
import { TopicType } from '../interfaces/topic.interface';
import { TopicDetailType } from '../interfaces/topicdetail.interface';
import { Item } from '../interfaces/item.interface';

@ApiSecurity('bearer')
@Controller('api/tasks')
export class TasksController {

    constructor(
        private readonly service: TasksService,
        private readonly logService: LogService
    ) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Get()
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async findAll(@Req() request: Request, @Res() res): Promise<TaskType[]> {
        const user: any = request.user;
        try {
            const r = await this.service.getTasks(user.userId);
            return res.status(HttpStatus.OK).json(r);
        } catch(e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Get(':id')
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async findOne(@Req() request: Request, @Param('id') id, @Res() res): Promise<TaskType> {
        const user: any = request.user;
        try {
            const r = await this.service.findOne(user.userId, id);
            if (!r) {
                return res.status(HttpStatus.NOT_FOUND).json();
            } else {
                return res.status(HttpStatus.OK).json(r);
            }
        } catch(e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Post()
    @ApiBody({ type: [TaskType] })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async create(@Req() request: Request, @Res() res, @Body() x: TaskType): Promise<TaskType> {
        const user: any = request.user;
        try {
            const r = await this.service.addTask(user.userId, x);
            return res.status(HttpStatus.CREATED).json(r);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Post('task/:id')
    @ApiBody({ type: [TaskType] })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async update(@Req() request: Request, @Res() res, @Param('id') id, @Body() x: TaskType): Promise<TaskType> {
        const user: any = request.user;
        try {
            const r = await this.service.updateTask(user.userId, id, x);
            if (!r) {
                return res.status(HttpStatus.NOT_FOUND).json();
            } else {
                return res.status(HttpStatus.OK).json(r);
            }
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Delete(':id')
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async delete(@Req() request: Request, @Res() res, @Param('id') id): Promise<TaskType> {
        const user: any = request.user;
        try {
            const r = await this.service.delete(user.userId, id);
            if (!r) {
                return res.status(HttpStatus.NOT_FOUND).json();
            } else {
                return res.status(HttpStatus.OK).json(r);
            }
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Get('topics/:id')
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async getTopics(@Res() res, @Param('id') id): Promise<TopicType[]> {
        try {
            const r = await this.service.getTopics(id);
            return res.status(HttpStatus.OK).json(r);
        } catch(e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Post('topics')
    @ApiBody({ type: [TopicType] })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async addTopic(@Res() res, @Body() x: TopicType): Promise<TopicType> {
        try {
            const r = await this.service.addTopic(x);
            return res.status(HttpStatus.CREATED).json(r);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Delete('topics/:id')
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async deleteTopic(@Res() res, @Param('id') id): Promise<TaskType> {
        try {
            const r = await this.service.deleteTopic(id);
            return res.status(HttpStatus.OK).json();
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Get('topic/:id')
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async getTopic(@Res() res, @Param('id') id): Promise<TopicDetailType> {
        try {
            const r = await this.service.getTopic(id);
            if (!r) {
                return res.status(HttpStatus.NOT_FOUND).json();
            } else {
                return res.status(HttpStatus.OK).json(r);
            }
        } catch(e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Post('topic')
    @ApiBody({ type: [TopicDetailType] })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async saveTopic(@Res() res, @Body() x: TopicDetailType): Promise<TopicDetailType> {
        try {
            const r = await this.service.saveTopic(x);
            return res.status(HttpStatus.CREATED).json(r);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Get('items/:id')
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async getItems(@Res() res, @Param('id') id): Promise<Item[]> {
        try {
            const r = await this.service.getItems(id);
            return res.status(HttpStatus.OK).json(r);
        } catch(e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Post('items')
    @ApiBody({ type: [Item] })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async addItem(@Res() res, @Body() x: Item): Promise<Item> {
        try {
            const r = await this.service.addItem(x);
            return res.status(HttpStatus.CREATED).json(r);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Delete('items/:id')
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async delItem(@Res() res, @Param('id') id): Promise<TaskType> {
        try {
            const r = await this.service.delItem(id);
            return res.status(HttpStatus.OK).json();
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }
}
