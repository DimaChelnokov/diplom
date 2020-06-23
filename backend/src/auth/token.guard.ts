import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { UsersService } from "../users/users.service";

@Injectable()
export class TokenGuard implements CanActivate {

    constructor(
        private readonly usersService: UsersService
    ) {}
        
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const headers: string[] = request.rawHeaders;
        const device: string = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
        const user = request.user;
        const u = await this.usersService.findOneByName(user.username);
        if (!u) {
            return false;
        }
        const token = headers.filter((s: string) => {
            return s.startsWith("Bearer ");
        }).map((s: string) => {
            return s.substring(7);
        })[0];
        const x = await this.usersService.getToken(u.id, device, token);
        return x !== null;
    }
}