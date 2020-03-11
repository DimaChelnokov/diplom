import { Controller, Get, Param, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../interfaces/user.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiOkResponse, ApiUnauthorizedResponse, ApiInternalServerErrorResponse, ApiSecurity, ApiParam, ApiForbiddenResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@ApiSecurity('bearer')
@Controller('users')
export class UsersController {

    constructor(private service: UsersService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Get()
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async findAll(@Res() res): Promise<User[]> {
        const r = await this.service.findAll();
        return res.status(HttpStatus.OK).json(r);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('user')
    @Get(':id')
    @ApiParam({ name: 'id', type: 'number', description: 'User ID', required: true})
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async findOne(@Res() res, @Param('id') id): Promise<User> {
        const r = await this.service.findOneById(id);
        if (!r) {
            return res.status(HttpStatus.NOT_FOUND).json();
        } else {
            return res.status(HttpStatus.OK).json(r);
        }
    }
}
