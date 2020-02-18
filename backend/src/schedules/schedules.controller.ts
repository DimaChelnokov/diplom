import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { ScheduleType } from '../interfaces/schedule.interface';
import { SchedulesService } from './schedules.service';

@Controller('schedules')
export class SchedulesController {

    constructor(private service: SchedulesService) {}

    @Get()
    async findAll(@Res() res): Promise<ScheduleType[]> {
        try {
            const x = await this.service.findAll();
            return res.status(HttpStatus.OK).json(x);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }
}
