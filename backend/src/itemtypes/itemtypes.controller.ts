import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { ItemtypesService } from './itemtypes.service';
import { ItemtypeType } from '../interfaces/itemtype.interface';

@Controller('itemtypes')
export class ItemtypesController {

    constructor(private service: ItemtypesService) {}

    @Get()
    async findAll(@Res() res): Promise<ItemtypeType[]> {
        try {
            const x = await this.service.findAll();
            return res.status(HttpStatus.OK).json(x);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }
}
