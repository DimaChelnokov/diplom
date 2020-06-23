import { Controller, UseGuards, Get, Res, Param, HttpStatus, Req, Post, Body } from '@nestjs/common';
import { ApiSecurity, ApiOkResponse, ApiUnauthorizedResponse, ApiInternalServerErrorResponse, ApiBody, ApiNotFoundResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { AnswerService } from './answer.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AnswerType } from '../interfaces/answer.interface';
import { Request } from 'express';
import { ResultType } from '../interfaces/result.interface';
import { TokenGuard } from '../auth/token.guard';

@ApiSecurity('bearer')
@Controller('api/answers')
export class AnswerController {

    constructor(
        private readonly service: AnswerService
    ) {}

    @UseGuards(JwtAuthGuard, TokenGuard)
    @Get('current/:id')
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async findSlide(@Req() request: Request, @Res() res, @Param('id') id): Promise<ResultType> {
        const user: any = request.user;
        try {
            const r = await this.service.getResults(user.userId, id);
            if (!r) {
                return res.status(HttpStatus.NOT_FOUND).json();
            } else {
                return res.status(HttpStatus.OK).json(r);
            }
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, TokenGuard)
    @Get('student/:student/:id')
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async findSlideByUser(@Res() res, @Param('student') student, @Param('id') id): Promise<ResultType> {
        try {
            const r = await this.service.getResultsByStudent(student, id);
            if (!r) {
                return res.status(HttpStatus.NOT_FOUND).json();
            } else {
                return res.status(HttpStatus.OK).json(r);
            }
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, TokenGuard)
    @Post('current')
    @ApiBody({ type: [ResultType] })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async update(@Req() request: Request, @Res() res, @Body() x: AnswerType[]): Promise<ResultType[]> {
        const user: any = request.user;
        try {
            let r: Array<ResultType> = new Array<ResultType>();
            for (let i = 0; i < x.length; i++) {
                 const it = await this.service.setResult(user.userId, x[i].id, x[i].is_checked);
                 if (!it) {
                    return res.status(HttpStatus.NOT_FOUND).json();
                 } 
                 r.push(it);
            }
            return res.status(HttpStatus.OK).json(r);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }
}
