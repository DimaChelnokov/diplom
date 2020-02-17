import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { ItemtypesService } from './itemtypes.service';
import { ItemType } from '../interfaces/itemtype.interface';

@Controller('itemtypes')
export class ItemtypesController {

    constructor(private service: ItemtypesService) {}

    @Get()
    async findAll(@Res() res): Promise<ItemType[]> {
        const x = await this.service.findAll();
        return res.status(HttpStatus.OK).json(x);
    }
}
