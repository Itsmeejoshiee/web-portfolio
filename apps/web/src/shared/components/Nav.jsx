import { useEffect, useRef, useState } from 'react';
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

function HamburgerIcon({ open }) {
  const barClass =
    'block h-[2px] w-5 origin-center bg-ink transition-transform duration-150 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]';
  return (
    <span className="flex flex-col items-center justify-center gap-[5px]">
      <span className={`${barClass} ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
      <span className={`${barClass} ${open ? 'opacity-0' : ''}`} />
      <span className={`${barClass} ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
    </span>
  );
}

export function Nav() {
  const { pathname, hash } = useLocation();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const firstLinkRef = useRef(null);

  // Same-page hash navigation still changes `hash` without changing `pathname`,
  // so both need to be watched or the drawer would stay open after a same-page tap.
  useEffect(() => {
    setOpen(false);
  }, [pathname, hash]);

  useEffect(() => {
    if (open) {
      firstLinkRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const closeAndReturnFocus = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-paper/92 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1160px] items-center justify-between gap-4 px-6">
        <Link
          to={{ pathname: '/', hash: '#hero' }}
          className="font-display text-lg font-semibold text-ink hover:text-ink"
        >
          josh gorospe<span className="text-accent">.</span>
        </Link>

        <div className="hidden items-center gap-[clamp(12px,2.5vw,28px)] sm:flex">
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

        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
          className="flex min-h-11 min-w-11 items-center justify-center rounded-full border-2 border-ink shadow-[3px_3px_0_var(--color-peach)] transition-transform duration-150 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.04] active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:hidden"
        >
          <HamburgerIcon open={open} />
        </button>
      </div>

      {open ? (
        <button
          type="button"
          aria-label="Close menu"
          onClick={closeAndReturnFocus}
          className="fixed inset-0 top-16 z-30 bg-ink/20 sm:hidden"
        />
      ) : null}

      <div
        className={`absolute left-0 right-0 top-16 z-40 origin-top border-b-2 border-ink bg-paper px-6 py-6 shadow-[0_4px_0_var(--color-ink)] transition-[transform,opacity] duration-150 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] sm:hidden ${
          open ? 'pointer-events-auto scale-y-100 opacity-100' : 'pointer-events-none scale-y-95 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-1">
          {NAV_LINKS.map((item, index) => {
            const isActive = item.matchPath !== undefined && pathname === item.matchPath;
            return (
              <Link
                key={item.key}
                ref={index === 0 ? firstLinkRef : undefined}
                to={item.to}
                tabIndex={open ? 0 : -1}
                className={`border-b border-border py-3 text-base font-medium text-ink hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  isActive ? 'font-semibold text-accent' : ''
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        <Link
          to={{ pathname: '/', hash: '#contact' }}
          tabIndex={open ? 0 : -1}
          className="mt-4 block w-full rounded-full bg-ink px-[18px] py-3 text-center text-sm font-medium text-paper shadow-[3px_3px_0_var(--color-peach)] transition-transform duration-150 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.02] hover:text-paper active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          say hi
        </Link>
      </div>
    </nav>
  );
}
