import { BlobCluster } from '../../../shared/components/BlobCluster';

const SOCIAL_LINKS = ['github', 'linkedin', 'twitter / x'];

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative mx-auto max-w-[1160px] border-t border-border px-6 pt-[120px] pb-[72px] text-center"
    >
      <p className="mb-6 font-mono text-[11px] tracking-[0.14em] text-faint uppercase">08 · say hi</p>
      <BlobCluster placement="contact" accent="var(--color-accent)" />
      <span className="mb-7 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-mint px-4 py-[7px] font-mono text-[11px] tracking-[0.1em] text-mint-ink shadow-[3px_3px_0_var(--color-ink)]">
        open for projects …
      </span>
      <h2 className="font-display mb-5 text-[clamp(56px,10vw,120px)] leading-none font-semibold tracking-[-0.02em]">
        Say hi<span className="text-accent">!</span>
      </h2>
      <p className="mx-auto mb-9 max-w-[440px] text-base text-muted">
        [One warm closing line placeholder — invite the project conversation.]
      </p>
      <div className="mb-12 flex flex-wrap items-center justify-center gap-4">
        <a
          href="mailto:hello@example.com"
          className="inline-block rounded-full border-2 border-ink bg-accent px-9 py-4 text-base font-semibold text-paper shadow-[5px_5px_0_var(--color-ink)] transition-transform duration-150 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.04] hover:text-paper active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          hello@[domain]
        </a>
      </div>
      <div className="flex flex-wrap justify-center gap-2.5">
        {SOCIAL_LINKS.map((label) => (
          <a
            key={label}
            href="#contact"
            className="rounded-full border-[1.5px] border-ink px-4 py-[7px] font-mono text-[11px] tracking-[0.08em] text-ink shadow-[2px_2px_0_var(--color-ink)] transition-[transform,border-color] duration-150 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.05] hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {label}
          </a>
        ))}
      </div>
    </section>
  );
}
