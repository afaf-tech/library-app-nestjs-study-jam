import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PublicGuard } from 'src/common/decorators/public.guard';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth-guard';

@Controller('v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @PublicGuard()
  @Post('login')
  async login(@Request() req) {

    return this.authService.login(req.user);
  }
}
