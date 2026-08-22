import { Link } from 'react-router-dom';
import { AchievementCard } from './AchievementCard';
import { useAchievements } from '../hooks/useAchievements';
import { toDisplayAchievement } from '../utils/formatAchievement';

const PREVIEW_LIMIT = 3;

export function AchievementsSection() {
  const { achievements } = useAchievements();
  const featuredAchievements = (achievements ?? [])
    .map(toDisplayAchievement)
    .filter((achievement) => achievement.featured)
    .slice(0, PREVIEW_LIMIT);

  return (
    <section id="achievements" className="mx-auto max-w-[1160px] border-t border-border px-6 py-24">
      <p className="mb-4 font-mono text-[11px] tracking-[0.14em] text-faint uppercase">05 · achievements</p>
      <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4">
        <h2 className="font-display text-[clamp(34px,4vw,44px)] font-semibold tracking-[-0.01em]">
          Achievements<span className="text-accent">.</span>
        </h2>
        <Link
          to="/achievements"
          className="text-sm font-medium whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          see more →
        </Link>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-6">
        {featuredAchievements.map((achievement) => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </section>
  );
}
