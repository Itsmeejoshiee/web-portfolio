import { Tag } from '../../../shared/components/Tag';

const ACHIEVEMENTS = [
  {
    id: 'hackathon-one',
    title: '[Hackathon award one]',
    event: '[Event name] · 20XX',
    description: '[One-line context placeholder — what was built, placement.]',
    iconBg: 'var(--color-peach)',
    iconShapeStyle: {
      width: '22px',
      height: '22px',
      background: 'var(--color-peach-ink)',
      borderRadius: '46% 54% 58% 42% / 50% 44% 56% 50%',
    },
    badge: { label: 'hackathon', bg: 'var(--color-peach)', fg: 'var(--color-peach-ink)' },
  },
  {
    id: 'hackathon-two',
    title: '[Hackathon award two]',
    event: '[Event name] · 20XX',
    description: '[One-line context placeholder — what was built, placement.]',
    iconBg: 'var(--color-lavender)',
    iconShapeStyle: {
      width: '22px',
      height: '22px',
      background: 'var(--color-lavender-ink)',
      borderRadius: '54% 46% 44% 56% / 48% 56% 44% 52%',
    },
    badge: { label: 'hackathon', bg: 'var(--color-lavender)', fg: 'var(--color-lavender-ink)' },
  },
  {
    id: 'university-one',
    title: '[University recognition]',
    event: '[University name] · 20XX',
    description: '[One-line context placeholder — what it recognized.]',
    iconBg: 'var(--color-mint)',
    iconShapeStyle: { width: '22px', height: '22px', background: 'var(--color-mint-ink)', borderRadius: '50%' },
    badge: { label: 'university', bg: 'var(--color-mint)', fg: 'var(--color-mint-ink)' },
  },
];

export function AchievementsSection() {
  return (
    <section id="achievements" className="mx-auto max-w-[1160px] border-t border-border px-6 py-24">
      <p className="mb-4 font-mono text-[11px] tracking-[0.14em] text-faint uppercase">05 · achievements</p>
      <h2 className="mb-10 font-display text-[clamp(34px,4vw,44px)] font-semibold tracking-[-0.01em]">
        Achievements<span className="text-accent">.</span>
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
        {ACHIEVEMENTS.map((achievement) => (
          <div key={achievement.id} className="raised-card flex flex-col gap-3.5 p-[26px]">
            <div className="flex items-center justify-between gap-3">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-ink shadow-[3px_3px_0_var(--color-ink)]"
                style={{ background: achievement.iconBg }}
              >
                <div style={achievement.iconShapeStyle} />
              </div>
              <Tag size="badge" bg={achievement.badge.bg} fg={achievement.badge.fg}>
                {achievement.badge.label}
              </Tag>
            </div>
            <div>
              <h3 className="font-display mb-1.5 text-[19px] font-semibold">{achievement.title}</h3>
              <p className="mb-2 font-mono text-[11px] tracking-[0.06em] text-faint">{achievement.event}</p>
              <p className="text-sm text-muted">{achievement.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
