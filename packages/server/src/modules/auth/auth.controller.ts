import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '../../guards/auth.guard';
import { GetLoginDto } from '../user/dto/get-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/login')
  async login(@Body() loginDto: LoginDto): Promise<GetLoginDto> {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  getProfile(@Request() req: any) {
    return req.user;
  }
}
