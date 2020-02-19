import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { TemplateType } from '../interfaces/template.interface';
import { ApiOkResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';

@Controller('templates')
export class TemplatesController {

    constructor(private service: TemplatesService) {}

    @Get()
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async findAll(@Res() res): Promise<TemplateType[]> {
        try {
            const x = await this.service.findAll();
            return res.status(HttpStatus.OK).json(x);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }    
}
