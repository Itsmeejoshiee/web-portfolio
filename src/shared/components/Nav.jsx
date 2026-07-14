import { Link, useLocation } from 'react-router-dom';

// Every nav item points at its home-page section anchor, same as Studio —
// visiting the dedicated /work, /templates, /blog pages only happens via
// each section's "see more" link. `matchPath` still lets the nav highlight
// itself when the user does end up on one of those pages.
const NAV_LINKS = [
  { key: 'work', label: 'work', to: { pathname: '/', hash: '#work' }, matchPath: '/work' },
  { key: 'studio', label: 'studio', to: { pathname: '/', hash: '#studio' } },
  { key: 'templates', label: 'templates', to: { pathname: '/', hash: '#templates' }, matchPath: '/templates' },
  { key: 'blog', label: 'blog', to: { pathname: '/', hash: '#blog' }, matchPath: '/blog' },
];

export function Nav() {
  const { pathname } = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-paper/92 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1160px] items-center justify-between gap-4 px-6">
        <Link
          to={{ pathname: '/', hash: '#hero' }}
          className="font-display text-lg font-semibold text-ink hover:text-ink"
        >
          josh gorospe<span className="text-accent">.</span>
        </Link>
        <div className="flex flex-wrap items-center gap-[clamp(12px,2.5vw,28px)]">
          {NAV_LINKS.map((item) => {
            const isActive = item.matchPath !== undefined && pathname === item.matchPath;
            return (
              <Link
                key={item.key}
                to={item.to}
                className={`text-sm font-medium text-ink hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  isActive ? 'font-semibold text-accent' : ''
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            to={{ pathname: '/', hash: '#contact' }}
            className="inline-block rounded-full bg-ink px-[18px] py-2 text-sm font-medium text-paper shadow-[3px_3px_0_var(--color-peach)] transition-transform duration-150 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.04] hover:text-paper active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            say hi
          </Link>
        </div>
      </div>
    </nav>
  );
}
