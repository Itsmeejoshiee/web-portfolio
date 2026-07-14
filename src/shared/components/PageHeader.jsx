export function PageHeader({ eyebrow, title, badge, intro }) {
  return (
    <header className="mx-auto max-w-[1160px] px-6 pt-[88px] pb-6">
      <p className="mb-5 font-mono text-xs tracking-[0.14em] text-muted uppercase">{eyebrow}</p>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-4">
        <h1 className="font-display text-[clamp(44px,7vw,72px)] leading-[1.05] font-semibold tracking-[-0.02em]">
          {title}
          <span className="text-accent">.</span>
        </h1>
        {badge ? <span className="font-mono text-[11px] tracking-[0.1em] text-faint">{badge}</span> : null}
      </div>
      <p className="max-w-[520px] text-base text-muted">{intro}</p>
    </header>
  );
}
