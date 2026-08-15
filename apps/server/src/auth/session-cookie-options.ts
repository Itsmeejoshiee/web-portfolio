// sameSite: 'none' is required for the cookie to survive cross-site fetch() calls
// (the frontend and backend live on different domains in production), but browsers
// reject 'none' without secure: true — which in turn requires HTTPS, so this can't be
// hardcoded without breaking plain-HTTP local dev, where 'lax' is both sufficient
// (same-site by port) and necessary (secure cookies are dropped over http://).
export function getSessionCookieOptions() {
  const isProduction = process.env.NODE_ENV === 'production';

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? ('none' as const) : ('lax' as const),
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
}
