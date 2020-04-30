import { Controller, UseGuards, Get, Res, HttpStatus, Param } from '@nestjs/common';
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
    async findTypes(@Res() res): Promise<GradeType[]> {
        try {
            const x = await this.service.findTypes();
            return res.status(HttpStatus.OK).json(x);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async findGrades(@Res() res, @Param('id') id): Promise<GradeType[]> {
        try {
            const x = await this.service.findGrades(id);
            return res.status(HttpStatus.OK).json(x);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }
}
