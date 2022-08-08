import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
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
      request.user = null;
    }

    return true;
  }
}
