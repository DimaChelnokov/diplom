import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
    
    constructor(
      private readonly usersService: UsersService,
      private readonly jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByName(username);
        if (user && user.password === pass) {
          const { password, ...result } = user;
          return result;
        }
        return null;
    }

    async login(id: number, name: string, device: string) {
      const payload = { username: name, sub: id };
      const u = await this.usersService.findOneById(id);
      const a = this.jwtService.sign(payload, { expiresIn: jwtConstants.access });
      const r = this.jwtService.sign(payload, { expiresIn: jwtConstants.refresh });
      await this.usersService.clearTokens(id, device);
      await this.usersService.addToken(id, device, 1, a);
      await this.usersService.addToken(id, device, 2, r);
      return {
        access_token: a,
        refresh_token: r,
        role: u.roleId
      };
    }
}
