import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-github2';
import { isAuthorizedOwner } from './is-authorized-owner';

export interface AdminUser {
  githubId: string;
  username: string;
}

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    const clientID = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;
    const callbackURL = process.env.GITHUB_OAUTH_CALLBACK_URL;

    if (!clientID || !clientSecret || !callbackURL) {
      throw new Error(
        'Missing GitHub OAuth configuration — set GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, and GITHUB_OAUTH_CALLBACK_URL.',
      );
    }

    super({ clientID, clientSecret, callbackURL });
  }

  validate(_accessToken: string, _refreshToken: string, profile: Profile): AdminUser {
    if (!isAuthorizedOwner(profile.id)) {
      throw new UnauthorizedException('This GitHub account is not authorized to access the admin panel.');
    }
    return { githubId: profile.id, username: profile.username ?? '' };
  }
}
