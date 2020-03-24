import { Controller, Get, Param, Res, HttpStatus, UseGuards, Post, Req, Body, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../interfaces/user.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiOkResponse, ApiUnauthorizedResponse, ApiInternalServerErrorResponse, ApiSecurity, ApiParam, ApiForbiddenResponse, ApiNotFoundResponse, ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
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

//    @UseGuards(JwtAuthGuard, RolesGuard)
//    @Roles('admin')
    @Get()
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async findAll(@Res() res): Promise<User[]> {
        const r = await this.service.findAll();
        return res.status(HttpStatus.OK).json(r);
    }

//    @UseGuards(JwtAuthGuard, RolesGuard)
//    @Roles('user')
    @Get(':id')
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async findOne(@Res() res, @Param('id') id): Promise<User> {
        const r = await this.service.findOneById(id);
        if (!r) {
            return res.status(HttpStatus.NOT_FOUND).json();
        } else {
            return res.status(HttpStatus.OK).json(r);
        }
    }

//    @UseGuards(JwtAuthGuard, RolesGuard)
//    @Roles('admin')
    @Post()
    @ApiBody({ type: [User] })
    @ApiCreatedResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async create(@Req() request: Request, @Res() res, @Body() x: User): Promise<User> {
        const user: any = request.user;
        try {
            const r = await this.service.create(x);
            await this.logService.create(user.userId, 2, 1, 'users', r, HttpStatus.CREATED);
            return res.status(HttpStatus.CREATED).json(r);
        } catch (e) {
            await this.logService.create(user.userId, 2, 1, 'users', x, HttpStatus.INTERNAL_SERVER_ERROR);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }
 
//    @UseGuards(JwtAuthGuard, RolesGuard)
//    @Roles('admin')
    @Post(':id')
    @ApiBody({ type: [User] })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async update(@Req() request: Request, @Res() res, @Param('id') id, @Body() x: User): Promise<User> {
        const user: any = request.user;
        try {
            const r = await this.service.update(id, x);
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

//    @UseGuards(JwtAuthGuard, RolesGuard)
//    @Roles('admin')
    @Delete(':id')
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async delete(@Req() request: Request, @Res() res, @Param('id') id): Promise<User> {
        const user: any = request.user;
        try {
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
