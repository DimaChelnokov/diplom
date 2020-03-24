import { Controller, UseGuards, Get, Res, HttpStatus } from '@nestjs/common';
import { ApiSecurity, ApiOkResponse, ApiUnauthorizedResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { GradetypesService } from './gradetypes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GradeType } from '../interfaces/gradetype.interface';

@ApiSecurity('bearer')
@Controller('api/gradetypes')
export class GradetypesController {
    
    constructor(private service: GradetypesService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
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
