import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { GradesService } from './grades.service';
import { GradeType } from '../interfaces/grade.interface';

@Controller('grades')
export class GradesController {

    constructor(private service: GradesService) {}

    @Get()
    async findAll(@Res() res): Promise<GradeType[]> {
        const x = await this.service.findAll();
        return res.status(HttpStatus.OK).json(x);
    }
}
