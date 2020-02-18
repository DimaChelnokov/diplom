import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { TypesService } from './types.service';
import { Type } from '../interfaces/type.interface';

@Controller('types')
export class TypesController {

    constructor(private service: TypesService) {}

    @Get()
    async findAll(@Res() res): Promise<Type[]> {
        try {
            const x = await this.service.findAll();
            return res.status(HttpStatus.OK).json(x);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }
}
