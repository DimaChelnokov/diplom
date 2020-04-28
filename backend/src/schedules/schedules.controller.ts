import { Controller, Get, Res, HttpStatus, Post, Body, Delete, Param, UseGuards, Req } from '@nestjs/common';
import { ScheduleType } from '../interfaces/schedule.interface';
import { SchedulesService } from './schedules.service';
import { ApiOkResponse, ApiInternalServerErrorResponse, ApiUnauthorizedResponse, ApiSecurity, ApiForbiddenResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Request } from 'express';
import { SlideType } from '../interfaces/slide.interface';
import { AnswerType } from '../interfaces/answer.interface';

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
            const x = await this.service.getSchedules(user.userId);
            return res.status(HttpStatus.OK).json(x);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async findSlide(@Res() res, @Param('id') id): Promise<SlideType> {
        try {
            const r = await this.service.getSlide(id);
            if (!r) {
                return res.status(HttpStatus.NOT_FOUND).json();
            } else {
                return res.status(HttpStatus.OK).json(r);
            }
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('slide/:id')
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async findAnswers(@Res() res, @Param('id') id): Promise<AnswerType[]> {
        try {
            const x = await this.service.getAnswers(id);
            return res.status(HttpStatus.OK).json(x);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }
}
