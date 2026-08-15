import { describe, it, expect } from 'vitest';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard, SESSION_COOKIE_NAME } from './jwt-auth.guard';

function buildContext(cookies: Record<string, string>): ExecutionContext {
  const request = { cookies };
  return {
    switchToHttp: () => ({ getRequest: () => request }),
  } as unknown as ExecutionContext;
}

describe('JwtAuthGuard', () => {
  const jwtService = new JwtService({ secret: 'test-secret' });
  const guard = new JwtAuthGuard(jwtService);

  it('allows the request when the session cookie holds a valid token', () => {
    const token = jwtService.sign({ githubId: '123456' });
    const context = buildContext({ [SESSION_COOKIE_NAME]: token });

    expect(guard.canActivate(context)).toBe(true);
  });

  it('rejects the request when there is no session cookie', () => {
    const context = buildContext({});

    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
  });

  it('rejects the request when the session cookie holds an invalid token', () => {
    const context = buildContext({ [SESSION_COOKIE_NAME]: 'not-a-real-token' });

    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
  });

  it('rejects the request when the session cookie was signed with a different secret', () => {
    const otherJwtService = new JwtService({ secret: 'a-different-secret' });
    const token = otherJwtService.sign({ githubId: '123456' });
    const context = buildContext({ [SESSION_COOKIE_NAME]: token });

    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
  });
});
