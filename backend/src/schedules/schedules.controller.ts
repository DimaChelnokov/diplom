import { Controller, Get, Res, HttpStatus, Post, Body, Delete, Param, UseGuards, Req } from '@nestjs/common';
import { ScheduleType } from '../interfaces/schedule.interface';
import { SchedulesService } from './schedules.service';
import { ApiOkResponse, ApiInternalServerErrorResponse, ApiUnauthorizedResponse, ApiSecurity, ApiForbiddenResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Request } from 'express';

@ApiSecurity('bearer')
@Controller('api/schedules')
export class SchedulesController {

    constructor(
        private readonly service: SchedulesService
    ) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('user')
    @Get()
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async findAll(@Req() request: Request, @Res() res): Promise<ScheduleType[]> {
        const user: any = request.user;
        try {
            const x = await this.service.findByStudent(user.userId);
            return res.status(HttpStatus.OK).json(x);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }
}
