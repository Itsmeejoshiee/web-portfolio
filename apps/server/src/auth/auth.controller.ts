import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import type { Request, Response } from 'express';
import { SESSION_COOKIE_NAME, JwtAuthGuard } from './jwt-auth.guard';
import type { AdminUser } from './github.strategy';
import { getSessionCookieOptions } from './session-cookie-options';

const WEB_ORIGIN = process.env.WEB_ORIGIN ?? 'http://localhost:5173';

@Controller('auth')
export class AuthController {
  constructor(private readonly jwtService: JwtService) {}

  @Get('github')
  @UseGuards(AuthGuard('github'))
  githubLogin() {
    // Passport redirects to GitHub before this handler body ever runs.
  }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  githubCallback(@Req() req: Request, @Res() res: Response) {
    const user = req.user as AdminUser;
    const token = this.jwtService.sign({ githubId: user.githubId, username: user.username });

    res.cookie(SESSION_COOKIE_NAME, token, getSessionCookieOptions());

    res.redirect(`${WEB_ORIGIN}/admin`);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@Req() req: Request) {
    return req.user;
  }

  @Get('logout')
  logout(@Res() res: Response) {
    res.clearCookie(SESSION_COOKIE_NAME, getSessionCookieOptions());
    res.redirect(`${WEB_ORIGIN}/admin/login`);
  }
}
