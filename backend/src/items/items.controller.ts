import { Controller, Get, Res, HttpStatus, Param, Post, Body, Delete, UseGuards, Req } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemType } from '../interfaces/item.interface';
import { ApiBody, ApiOkResponse, ApiInternalServerErrorResponse, ApiParam, ApiUnauthorizedResponse, ApiSecurity, ApiForbiddenResponse, ApiNotFoundResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Request } from 'express';
import { LogService } from '../log/log.service';

@ApiSecurity('bearer')
@Controller('api/items')
export class ItemsController {

    constructor(
        private readonly service: ItemsService,
        private readonly logService: LogService
    ) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('user')
    @Get()
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async findAll(@Res() res): Promise<ItemType[]> {
        try {
            const x = await this.service.findAll();
            return res.status(HttpStatus.OK).json(x);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('user')
    @Get(':id')
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async findTopic(@Res() res, @Param('id') id): Promise<ItemType[]> {
        try {
            const x = await this.service.findTopics(id);
            return res.status(HttpStatus.OK).json(x);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Post()
    @ApiBody({ type: [ItemType] })
    @ApiCreatedResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async create(@Req() request: Request, @Res() res, @Body() x: ItemType): Promise<ItemType> {
        const user: any = request.user;
        try {
            const r = await this.service.create(x);
            await this.logService.create(user.userId, 2, 5, 'items', r, HttpStatus.CREATED);
            return res.status(HttpStatus.CREATED).json(r);
        } catch (e) {
            await this.logService.create(user.userId, 2, 5, 'items', x, HttpStatus.INTERNAL_SERVER_ERROR);
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
    async delete(@Req() request: Request, @Res() res, @Param('id') id): Promise<ItemType> {
        const user: any = request.user;
        try {
            const r = await this.service.delete(id);
            if (!r) {
                await this.logService.create(user.userId, 4, 5, 'items', { id: id }, HttpStatus.NOT_FOUND);
                return res.status(HttpStatus.NOT_FOUND).json();
            } else {
                await this.logService.create(user.userId, 4, 5, 'items', r, HttpStatus.NOT_FOUND);
                return res.status(HttpStatus.OK).json(r);
            }
        } catch (e) {
            await this.logService.create(user.userId, 4, 5, 'items', { id: id }, HttpStatus.INTERNAL_SERVER_ERROR);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }
}
