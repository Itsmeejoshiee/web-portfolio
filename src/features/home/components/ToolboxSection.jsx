import { Tag } from '../../../shared/components/Tag';

const GROUPS = [
  {
    id: 'languages',
    title: 'Languages',
    dotColor: 'var(--color-accent)',
    dotRadius: '46% 54% 58% 42% / 50% 44% 56% 50%',
    hoverBorder: 'var(--color-accent)',
    hoverText: 'var(--color-accent)',
    items: ['python', 'typescript', 'javascript', 'sql'],
  },
  {
    id: 'frameworks',
    title: 'Frameworks',
    dotColor: 'var(--color-periwinkle)',
    dotRadius: '54% 46% 44% 56% / 48% 56% 44% 52%',
    hoverBorder: 'var(--color-periwinkle)',
    hoverText: 'var(--color-periwinkle)',
    items: ['react', 'next.js', 'node.js', 'tailwind', 'three.js', 'notion api'],
  },
  {
    id: 'tools',
    title: 'Tools',
    dotColor: 'var(--color-green)',
    dotRadius: '50%',
    hoverBorder: 'var(--color-green)',
    hoverText: 'var(--color-mint-ink)',
    items: ['git / github', 'vercel', 'figma', 'notion'],
  },
];

export function ToolboxSection() {
  return (
    <section id="toolbox" className="mx-auto max-w-[1160px] border-t border-border px-6 py-24">
      <p className="mb-4 font-mono text-[11px] tracking-[0.14em] text-faint uppercase">06 · toolbox</p>
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-4">
        <h2 className="font-display text-[clamp(34px,4vw,44px)] font-semibold tracking-[-0.01em]">
          Toolbox<span className="text-accent">.</span>
        </h2>
        <span className="font-mono text-[11px] tracking-[0.1em] text-faint">the stack behind the work …</span>
      </div>
      <p className="mb-11 max-w-[520px] text-[15px] text-muted">
        [One line placeholder — tools picked per project, not the other way around.]
      </p>
      <div className="flex flex-col gap-10">
        {GROUPS.map((group) => (
          <div key={group.id} className="flex flex-col gap-[18px]">
            <div className="flex items-center gap-2.5">
              <span className="h-2.5 w-2.5" style={{ background: group.dotColor, borderRadius: group.dotRadius }} />
              <h3 className="font-display text-[17px] font-semibold">{group.title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Tag key={item} size="pill" hoverBorder={group.hoverBorder} hoverText={group.hoverText}>
                  {item}
                </Tag>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
