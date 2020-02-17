import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { TemplateType } from '../interfaces/template.interface';

@Controller('templates')
export class TemplatesController {

    constructor(private service: TemplatesService) {}

    @Get()
    async findAll(@Res() res): Promise<TemplateType[]> {
        const x = await this.service.findAll();
        return res.status(HttpStatus.OK).json(x);
    }    
}
