import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../modules/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization
      ? request.headers.authorization?.split(' ')?.[1]
      : '';

    try {
      request.user = await this.authService.verifyToken(token);
    } catch (e) {
      throw new UnauthorizedException(e);
    }

    return true;
  }
}
