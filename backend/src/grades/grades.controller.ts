import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { GradesService } from './grades.service';
import { GradeType } from '../interfaces/grade.interface';
import { ApiOkResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';

@Controller('grades')
export class GradesController {

    constructor(private service: GradesService) {}

    @Get()
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async findAll(@Res() res): Promise<GradeType[]> {
        try {
            const x = await this.service.findAll();
            return res.status(HttpStatus.OK).json(x);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }
}
