import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { TemplateType } from '../interfaces/template.interface';

@Controller('templates')
export class TemplatesController {

    constructor(private service: TemplatesService) {}

    @Get()
    async findAll(@Res() res): Promise<TemplateType[]> {
        try {
            const x = await this.service.findAll();
            return res.status(HttpStatus.OK).json(x);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }    
}
