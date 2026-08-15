import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { isAuthorizedOwner } from './is-authorized-owner';

describe('isAuthorizedOwner', () => {
  const originalOwnerId = process.env.OWNER_GITHUB_ID;

  beforeEach(() => {
    process.env.OWNER_GITHUB_ID = '123456';
  });

  afterEach(() => {
    process.env.OWNER_GITHUB_ID = originalOwnerId;
  });

  it('returns true when the GitHub user id matches the configured owner id', () => {
    expect(isAuthorizedOwner('123456')).toBe(true);
  });

  it('returns false when the GitHub user id does not match the configured owner id', () => {
    expect(isAuthorizedOwner('999999')).toBe(false);
  });

  it('returns false when OWNER_GITHUB_ID is not configured', () => {
    delete process.env.OWNER_GITHUB_ID;

    expect(isAuthorizedOwner('123456')).toBe(false);
  });

  it('returns false when OWNER_GITHUB_ID is explicitly set to an empty string', () => {
    process.env.OWNER_GITHUB_ID = '';

    expect(isAuthorizedOwner('')).toBe(false);
  });

  it('still matches when a permissive OAuth client passes a numeric id instead of a string', () => {
    expect(isAuthorizedOwner(123456 as unknown as string)).toBe(true);
  });
});
