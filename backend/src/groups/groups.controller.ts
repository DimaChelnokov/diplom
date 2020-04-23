import { Controller, Get, Res, HttpStatus, Param, Delete, Post, Body, UseGuards, Req } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupType } from '../interfaces/group.interface';
import { ApiBody, ApiOkResponse, ApiInternalServerErrorResponse, ApiUnauthorizedResponse, ApiSecurity, ApiForbiddenResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Request } from 'express';
import { LogService } from '../log/log.service';

@ApiSecurity('bearer')
@Controller('api/groups')
export class GroupsController {

    constructor(
        private readonly service: GroupsService,
        private readonly logService: LogService
    ) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Get()
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async findAll(@Res() res): Promise<GroupType[]> {
        try {
            const x = await this.service.findAll();
            return res.status(HttpStatus.OK).json(x);
        } catch (e) {
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
    async findOne(@Res() res, @Param('id') id): Promise<GroupType> {
        try {
            const r = await this.service.findOne(id);
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
    @Post()
    @ApiBody({ type: [GroupType] })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async create(@Req() request: Request, @Res() res, @Body() x: GroupType): Promise<GroupType> {
        const user: any = request.user;
        try {
            const r = await this.service.create(x);
            await this.logService.create(user.userId, 2, 4, 'groups', r, HttpStatus.CREATED);
            return res.status(HttpStatus.CREATED).json(r);
        } catch (e) {
            await this.logService.create(user.userId, 2, 4, 'groups', x, HttpStatus.INTERNAL_SERVER_ERROR);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Post(':id')
    @ApiBody({ type: [GroupType] })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async update(@Req() request: Request, @Res() res, @Param('id') id, @Body() x: GroupType): Promise<GroupType> {
        const user: any = request.user;
        try {
            const r = await this.service.update(id, x);
            if (!r) {
                await this.logService.create(user.userId, 3, 4, 'grades', { id: id }, HttpStatus.NOT_FOUND);
                return res.status(HttpStatus.NOT_FOUND).json();
            } else {
                await this.logService.create(user.userId, 3, 4, 'grades', r, HttpStatus.OK);
                return res.status(HttpStatus.OK).json(r);
            }
        } catch (e) {
            await this.logService.create(user.userId, 3, 4, 'grades', { id: id }, HttpStatus.INTERNAL_SERVER_ERROR);
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
    async delete(@Req() request: Request, @Res() res, @Param('id') id): Promise<GroupType> {
        const user: any = request.user;
        try {
            const r = await this.service.delete(id);
            if (!r) {
                await this.logService.create(user.userId, 4, 4, 'grades', { id: id }, HttpStatus.NOT_FOUND);
                return res.status(HttpStatus.NOT_FOUND).json();
            } else {
                await this.logService.create(user.userId, 4, 4, 'grades', r, HttpStatus.OK);
                return res.status(HttpStatus.OK).json(r);
            }
        } catch (e) {
            await this.logService.create(user.userId, 4, 4, 'grades', { id: id }, HttpStatus.INTERNAL_SERVER_ERROR);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }
}
