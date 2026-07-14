import { Tag } from '../../../shared/components/Tag';

const STUDIO_PROJECTS = [
  {
    id: 'studio-project-one',
    title: '[Studio project one]',
    blurb: '[Short blurb placeholder]',
    status: { label: 'shipped', bg: 'var(--color-mint)', fg: 'var(--color-mint-ink)' },
  },
  {
    id: 'studio-project-two',
    title: '[Studio project two]',
    blurb: '[Short blurb placeholder]',
    status: { label: 'brewing', bg: 'var(--color-peach)', fg: 'var(--color-peach-ink)' },
  },
  {
    id: 'studio-experiment-three',
    title: '[Studio experiment three]',
    blurb: '[Short blurb placeholder]',
    status: { label: 'brewing', bg: 'var(--color-peach)', fg: 'var(--color-peach-ink)' },
  },
];

export function StudioLive() {
  return (
    <section id="studio" className="bg-ink text-paper">
      <div className="mx-auto grid max-w-[1160px] grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] items-start gap-14 px-6 py-[104px]">
        <div>
          <p className="mb-5 font-mono text-xs tracking-[0.14em] text-faint uppercase">02 · the studio</p>
          <h2 className="mb-4 font-display text-[clamp(40px,5vw,56px)] font-semibold tracking-[-0.01em] text-paper">
            haraya labs<span className="text-accent">.</span>
          </h2>
          <p className="mb-3 text-[17px] text-paper">
            <em className="text-peach italic">haraya</em> — Filipino for <strong>imagination</strong>.
          </p>
          <p className="mb-8 max-w-[420px] text-[15px] text-faint">
            [One-line studio mission placeholder — what Haraya makes and why.]
          </p>
          <a
            href="#studio"
            className="inline-block rounded-full border-[1.5px] border-[rgba(250,246,239,0.45)] px-6 py-[11px] text-sm font-medium text-paper shadow-[3px_3px_0_rgba(0,0,0,0.4)] transition-[transform,border-color] duration-150 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.04] hover:border-accent hover:text-paper active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            follow the studio →
          </a>
        </div>
        <div className="flex flex-col gap-3">
          {STUDIO_PROJECTS.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between gap-4 rounded-[14px] border-2 border-[rgba(250,246,239,0.18)] px-[22px] py-5 shadow-[5px_5px_0_rgba(0,0,0,0.45)]"
            >
              <div>
                <h3 className="mb-1 font-display text-lg font-semibold text-paper">{project.title}</h3>
                <p className="text-[13.5px] text-faint">{project.blurb}</p>
              </div>
              <Tag size="badge" bg={project.status.bg} fg={project.status.fg} className="flex-none">
                {project.status.label}
              </Tag>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
