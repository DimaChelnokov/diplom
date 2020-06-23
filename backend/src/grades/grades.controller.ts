import { Controller, Res, HttpStatus, UseGuards, Post, Body } from '@nestjs/common';
import { GradesService } from './grades.service';
import { ApiOkResponse, ApiInternalServerErrorResponse, ApiUnauthorizedResponse, ApiSecurity, ApiBody, ApiForbiddenResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { TaskGrade } from '../interfaces/taskgrade.interface';
import { TokenGuard } from '../auth/token.guard';

@ApiSecurity('bearer')
@Controller('api/grades')
export class GradesController {

    constructor(
        private readonly service: GradesService
    ) {}

    @UseGuards(JwtAuthGuard, RolesGuard, TokenGuard)
    @Roles('admin')
    @Post()
    @ApiBody({ type: [TaskGrade] })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async update(@Res() res, @Body() x: TaskGrade): Promise<TaskGrade> {
        try {
            const r = await this.service.updateGrade(x.student_id, x.task_id, x);
            return res.status(HttpStatus.OK).json(r);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }
}
