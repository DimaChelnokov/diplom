import { Controller, Get, Param, Res, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../interfaces/user.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiOkResponse, ApiUnauthorizedResponse, ApiInternalServerErrorResponse, ApiSecurity, ApiParam } from '@nestjs/swagger';

@ApiSecurity('bearer')
@Controller('users')
export class UsersController {

    constructor(private service: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async findAll(@Res() res): Promise<User[]> {
        const x = await this.service.findAll();
        return res.status(HttpStatus.OK).json(x);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiParam({ name: 'id', type: 'number', description: 'User ID', required: true})
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async findOne(@Res() res, @Param('id') id): Promise<User> {
        const x = await this.service.findOneById(id);
        return res.status(HttpStatus.OK).json(x);
    }
}
