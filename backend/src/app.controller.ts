import { Controller, UseGuards, Request, Post, HttpStatus, UseInterceptors, UploadedFiles, Res, Req, Get } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { ApiUnauthorizedResponse, ApiBody, ApiCreatedResponse, ApiSecurity, ApiOkResponse, ApiInternalServerErrorResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { User } from './interfaces/user.interface';
import { LogService } from './log/log.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { TokenGuard } from './auth/token.guard';

@ApiSecurity('basic')
@Controller()
export class AppController {

  constructor(
    private readonly authService: AuthService,
    private readonly logService: LogService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('api/auth/login')
  @ApiBody({ type: [User] })
  @ApiCreatedResponse({ description: 'Successfully.'})
  @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
  async login(@Request() req) {
    const device: string = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const r = await this.authService.login(req.user.id, req.user.username, device);
    await this.logService.create(req.user.id, 1, 1, 'api/auth/login', req.user, HttpStatus.CREATED);
    return r;
  }

  @UseGuards(JwtAuthGuard, TokenGuard)
  @Get('api/auth/refresh')
  @ApiCreatedResponse({ description: 'Successfully.'})
  @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
  @ApiForbiddenResponse({ description: 'Forbidden.'})
  async refresh(@Request() req) {
    const device: string = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const r = await this.authService.login(req.user.userId, req.user.username, device);
    return r;
  }

  @Post('api/upload')
  @UseInterceptors(AnyFilesInterceptor())
  @ApiOkResponse({ description: 'Successfully.'})
  @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
  async uploadFile(@UploadedFiles() files, @Res() res) {
    for (let file of files) {
      await this.logService.addFile(file);
    }
    return res.status(HttpStatus.OK).json(files);
  }
}
