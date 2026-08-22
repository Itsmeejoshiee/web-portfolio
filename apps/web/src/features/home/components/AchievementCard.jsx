import { Tag } from '../../../shared/components/Tag';

export function AchievementCard({ achievement }) {
  return (
    <div className="raised-card flex flex-col gap-3.5 p-[26px]">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-[19px] font-semibold">{achievement.title}</h3>
        <Tag size="badge" bg={achievement.badge.bg} fg={achievement.badge.fg}>
          {achievement.badge.label}
        </Tag>
      </div>
      <div>
        <p className="mb-2 font-mono text-[11px] tracking-[0.06em] text-faint">{achievement.event}</p>
        <p className="text-sm text-muted">{achievement.description}</p>
      </div>
    </div>
  );
}
