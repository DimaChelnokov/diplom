import { Controller, Get, Res, HttpStatus, Param, Post, Body, Delete, UseGuards, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ApiBody, ApiOkResponse, ApiInternalServerErrorResponse, ApiUnauthorizedResponse, ApiSecurity, ApiForbiddenResponse, ApiNotFoundResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { LogService } from '../log/log.service';

@ApiSecurity('bearer')
@Controller('api/tasks')
export class TasksController {

    constructor(
        private readonly service: TasksService,
        private readonly logService: LogService
    ) {}

}
