import { Controller, Request, UseGuards, Post } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { ApiUnauthorizedResponse, ApiBody, ApiCreatedResponse, ApiSecurity } from '@nestjs/swagger';
import { User } from './interfaces/user.interface';

@ApiSecurity('basic')
@Controller()
export class AppController {

  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiBody({ type: [User] })
  @ApiCreatedResponse({ description: 'Successfully.'})
  @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
