import { Controller, Get, Res, HttpStatus, UseGuards, Post, Body, Req, Param, Delete } from '@nestjs/common';
import { GradesService } from './grades.service';
import { ApiOkResponse, ApiInternalServerErrorResponse, ApiUnauthorizedResponse, ApiSecurity, ApiBody, ApiNotFoundResponse, ApiForbiddenResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { LogService } from '../log/log.service';

@ApiSecurity('bearer')
@Controller('api/grades')
export class GradesController {

    constructor(
        private readonly service: GradesService,
        private readonly logService: LogService
    ) {}

}
