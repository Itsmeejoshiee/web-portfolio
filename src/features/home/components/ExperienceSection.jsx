import { Tag } from '../../../shared/components/Tag';

const PROFESSIONAL = [
  {
    id: 'role-current',
    role: '[Role placeholder] · [Organization]',
    period: '[Mon] 20XX — present',
    location: '[City, Philippines]',
    summary: '[One-line summary placeholder.]',
  },
  {
    id: 'role-previous',
    role: '[Previous role placeholder] · [Organization]',
    period: '[Mon] 20XX — [Mon] 20XX',
    location: '[City, Philippines]',
    summary: '[One-line summary placeholder.]',
  },
  {
    id: 'role-earlier',
    role: '[Earlier role placeholder] · [Organization]',
    period: '[Mon] 20XX — [Mon] 20XX',
    location: '[City, Philippines]',
    summary: '[One-line summary placeholder.]',
  },
];

const COMMUNITY = [
  {
    id: 'community-one',
    role: '[Community role placeholder] · [Organization]',
    period: '[Mon] 20XX — present',
    tag: { label: 'community', bg: 'var(--color-mint)', fg: 'var(--color-mint-ink)' },
    dotColor: 'var(--color-green)',
    summary: '[One-line summary placeholder.]',
  },
  {
    id: 'community-two',
    role: '[Community role placeholder two] · [Organization]',
    period: '[Mon] 20XX — [Mon] 20XX',
    tag: { label: 'community', bg: 'var(--color-mint)', fg: 'var(--color-mint-ink)' },
    dotColor: 'var(--color-green)',
    summary: '[One-line summary placeholder.]',
  },
  {
    id: 'mentorship-one',
    role: '[Mentorship role placeholder] · [Organization]',
    period: '[Mon] 20XX — [Mon] 20XX',
    tag: { label: 'mentorship', bg: 'var(--color-lavender)', fg: 'var(--color-lavender-ink)' },
    dotColor: 'var(--color-periwinkle)',
    summary: '[One-line summary placeholder.]',
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="mx-auto max-w-[1160px] border-t border-border px-6 py-24">
      <p className="mb-4 font-mono text-[11px] tracking-[0.14em] text-faint uppercase">04 · experience</p>
      <h2 className="mb-12 font-display text-[clamp(34px,4vw,44px)] font-semibold tracking-[-0.01em]">
        Experience<span className="text-accent">.</span>
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(420px,100%),1fr))] items-start gap-[72px]">
        <div>
          <div className="mb-7 flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--color-accent)' }} />
            <h3 className="font-display text-[22px] font-semibold">Professional</h3>
          </div>
          <div className="ml-[7px] flex flex-col gap-10 border-l-2 border-border py-1">
            {PROFESSIONAL.map((item) => (
              <div key={item.id} className="relative pl-[34px]">
                <span
                  className="absolute top-1 left-[-9px] h-4 w-4 rounded-full border-[3px] border-paper outline-2 outline-ink"
                  style={{ background: 'var(--color-accent)' }}
                />
                <h4 className="font-display text-[19px] font-semibold">{item.role}</h4>
                <div className="mt-1 flex flex-wrap items-baseline gap-3">
                  <span className="font-mono text-[11px] tracking-[0.06em] text-faint">{item.period}</span>
                  <span className="font-mono text-[11px] tracking-[0.06em] text-faint">{item.location}</span>
                </div>
                <p className="mt-1.5 max-w-[480px] text-sm text-muted">{item.summary}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-7 flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--color-green)' }} />
            <h3 className="font-display text-[22px] font-semibold">Community &amp; mentorship</h3>
          </div>
          <div className="ml-[7px] flex flex-col gap-10 border-l-2 border-border py-1">
            {COMMUNITY.map((item) => (
              <div key={item.id} className="relative pl-[34px]">
                <span
                  className="absolute top-1 left-[-9px] h-4 w-4 rounded-full border-[3px] border-paper outline-2 outline-ink"
                  style={{ background: item.dotColor }}
                />
                <h4 className="font-display text-[19px] font-semibold">{item.role}</h4>
                <div className="mt-1 flex flex-wrap items-baseline gap-3">
                  <span className="font-mono text-[11px] tracking-[0.06em] text-faint">{item.period}</span>
                  <Tag size="tiny" bg={item.tag.bg} fg={item.tag.fg}>
                    {item.tag.label}
                  </Tag>
                </div>
                <p className="mt-1.5 max-w-[480px] text-sm text-muted">{item.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
