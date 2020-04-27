import { Controller, Get, Param, Res, HttpStatus, UseGuards, Post, Req, Body, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../interfaces/user.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiOkResponse, ApiUnauthorizedResponse, ApiInternalServerErrorResponse, ApiSecurity, ApiForbiddenResponse, ApiNotFoundResponse, ApiBody, ApiCreatedResponse, ApiConflictResponse } from '@nestjs/swagger';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { LogService } from '../log/log.service';
import { Request } from 'express';

@ApiSecurity('bearer')
@Controller('api/users')
export class UsersController {

    constructor(
        private readonly service: UsersService,
        private readonly logService: LogService
    ) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Get()
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async findAll(@Res() res): Promise<User[]> {
        const r = await this.service.findAll();
        return res.status(HttpStatus.OK).json(r);
    }

    @UseGuards(JwtAuthGuard)
    @Get('current')
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async findCurrent(@Req() request: Request, @Res() res): Promise<User> {
        const user: any = request.user;
        const r = await this.service.findOneById(user.userId);
        if (!r) {
            return res.status(HttpStatus.NOT_FOUND).json();
        } else {
            return res.status(HttpStatus.OK).json(r);
        }
    }

    @Post()
    @ApiBody({ type: [User] })
    @ApiCreatedResponse({ description: 'Successfully.'})
    @ApiConflictResponse({ description: 'User already exists.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async create(@Res() res, @Body() x: User): Promise<User> {
        try {
            const y = await this.service.findOneByName(x.username);
            if (y) {
                return res.status(HttpStatus.CONFLICT).json(x);
            }
            const r = await this.service.create(x);
            await this.logService.create(r.id, 2, 1, 'users', r, HttpStatus.CREATED);
            return res.status(HttpStatus.CREATED).json(r);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }
 
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Post('id/:id')
    @ApiBody({ type: [User] })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async update(@Req() request: Request, @Res() res, @Param('id') id, @Body() x: User): Promise<User> {
        const user: any = request.user;
        try {
            if (id == user.userId) {
                return res.status(HttpStatus.FORBIDDEN).json();
            }
            const r = await this.service.updateRole(id, x);
            if (!r) {
                await this.logService.create(user.userId, 3, 1, 'users', { id: id }, HttpStatus.NOT_FOUND);
                return res.status(HttpStatus.NOT_FOUND).json();
            } else {
                await this.logService.create(user.userId, 3, 1, 'users', r, HttpStatus.OK);
                return res.status(HttpStatus.OK).json(r);
            }
        } catch (e) {
            await this.logService.create(user.userId, 3, 1, 'users', { id: id }, HttpStatus.INTERNAL_SERVER_ERROR);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('current')
    @ApiBody({ type: [User] })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async updateCurrent(@Req() request: Request, @Res() res, @Body() x: User): Promise<User> {
        const user: any = request.user;
        try {
            const r = await this.service.updateFio(user.userId, x);
            if (!r) {
                await this.logService.create(user.userId, 3, 1, 'users', { id: user.userId }, HttpStatus.NOT_FOUND);
                return res.status(HttpStatus.NOT_FOUND).json();
            } else {
                await this.logService.create(user.userId, 3, 1, 'users', r, HttpStatus.OK);
                return res.status(HttpStatus.OK).json(r);
            }
        } catch (e) {
            await this.logService.create(user.userId, 3, 1, 'users', { id: user.userId }, HttpStatus.INTERNAL_SERVER_ERROR);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Delete('id/:id')
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async delete(@Req() request: Request, @Res() res, @Param('id') id): Promise<User> {
        const user: any = request.user;
        try {
            if (id == user.userId) {
                return res.status(HttpStatus.FORBIDDEN).json();
            }
            const r = await this.service.delete(id);
            if (!r) {
                await this.logService.create(user.userId, 4, 1, 'users', { id: id }, HttpStatus.NOT_FOUND);
                return res.status(HttpStatus.NOT_FOUND).json();
            } else {
                await this.logService.create(user.userId, 4, 1, 'users', r, HttpStatus.OK);
                return res.status(HttpStatus.OK).json(r);
            }
        } catch (e) {
            await this.logService.create(user.userId, 4, 1, 'users', { id: id }, HttpStatus.INTERNAL_SERVER_ERROR);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }
}
