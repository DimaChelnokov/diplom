import { Controller, UseGuards, Get, Res, HttpStatus } from '@nestjs/common';
import { ApiSecurity, ApiOkResponse, ApiUnauthorizedResponse, ApiInternalServerErrorResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserLog } from '../interfaces/log.interface';
import { LogService } from './log.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { TokenGuard } from '../auth/token.guard';

@ApiSecurity('bearer')
@Controller('api/log')
export class LogController {

    constructor(private service: LogService) {}

    @UseGuards(JwtAuthGuard, RolesGuard, TokenGuard)
    @Roles('admin')
    @Get()
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async findAll(@Res() res): Promise<UserLog[]> {
        try {
            const r = await this.service.findAll();
            return res.status(HttpStatus.OK).json(r);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }
}
