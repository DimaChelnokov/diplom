import { Controller, Request, UseGuards, Post, HttpStatus, UseInterceptors, UploadedFile, UploadedFiles, Res } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { ApiUnauthorizedResponse, ApiBody, ApiCreatedResponse, ApiSecurity } from '@nestjs/swagger';
import { User } from './interfaces/user.interface';
import { LogService } from './log/log.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@ApiSecurity('basic')
@Controller()
export class AppController {

  constructor(
    private readonly authService: AuthService,
    private readonly logService: LogService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiBody({ type: [User] })
  @ApiCreatedResponse({ description: 'Successfully.'})
  @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
  async login(@Request() req) {
    const r = await this.authService.login(req.user);
    await this.logService.create(req.user.id, 1, 1, 'auth/login', req.user, HttpStatus.CREATED);
    return r;
  }

  @Post('upload')
  @UseInterceptors(AnyFilesInterceptor())
  async uploadFile(@UploadedFiles() files, @Res() res) {
    return res.status(HttpStatus.OK).json(files);
  }
}
