import { describe, it, expect, afterEach } from 'vitest';
import { getSessionCookieOptions } from './session-cookie-options';

describe('getSessionCookieOptions', () => {
  const originalNodeEnv = process.env.NODE_ENV;

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
  });

  it('uses sameSite=lax and secure=false outside production, so it works over local http://', () => {
    process.env.NODE_ENV = 'development';

    expect(getSessionCookieOptions()).toMatchObject({ secure: false, sameSite: 'lax' });
  });

  it('uses sameSite=none and secure=true in production, so the cookie survives cross-site fetch()', () => {
    process.env.NODE_ENV = 'production';

    expect(getSessionCookieOptions()).toMatchObject({ secure: true, sameSite: 'none' });
  });
});
