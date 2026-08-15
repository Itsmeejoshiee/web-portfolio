import { Link } from 'react-router-dom';

export function Footer({ variant }) {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1160px] flex-wrap items-center justify-between gap-3 p-6">
        {variant === 'home' ? (
          <span className="font-mono text-[10.5px] tracking-[0.06em] text-faint">© 20XX josh gorospe</span>
        ) : (
          <Link to="/" className="font-mono text-[10.5px] tracking-[0.06em] text-muted hover:text-accent">
            ← back home
          </Link>
        )}
        <span className="font-mono text-[10.5px] tracking-[0.06em] text-faint">
          built with react · three.js · notion
        </span>
      </div>
    </footer>
  );
}
