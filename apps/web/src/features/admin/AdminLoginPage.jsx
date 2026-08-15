import { API_URL_BASE } from './api/adminApiClient';

export function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-6 text-ink">
      <div className="raised-card flex max-w-sm flex-col items-center gap-6 p-10 text-center">
        <h1 className="font-display text-3xl font-semibold">
          Admin<span className="text-accent">.</span>
        </h1>
        <p className="text-sm text-muted">Sign in with the GitHub account that owns this site.</p>
        <a
          href={`${API_URL_BASE}/auth/github`}
          className="inline-block rounded-full border-2 border-ink bg-accent px-[30px] py-[14px] text-[15px] font-semibold text-paper shadow-[4px_4px_0_var(--color-ink)] transition-transform duration-150 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.04] hover:text-paper active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Sign in with GitHub
        </a>
      </div>
    </div>
  );
}
