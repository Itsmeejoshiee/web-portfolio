import { AsyncGate } from '../../shared/components/AsyncGate';
import { PageHeader } from '../../shared/components/PageHeader';
import { useSiteSection } from '../../shared/hooks/useSiteSection';
import { AchievementCard } from './components/AchievementCard';
import { useAchievements } from './hooks/useAchievements';
import { toDisplayAchievement } from './utils/formatAchievement';

const FALLBACK_INTRO = 'A few wins worth mentioning — hackathons, recognitions, the occasional trophy.';

export function AchievementsPage() {
  const section = useSiteSection('achievements-header');
  const { achievements, loading, error } = useAchievements();

  return (
    <>
      <PageHeader eyebrow="achievements" title="Achievements" intro={section?.body ?? FALLBACK_INTRO} />
      <section className="mx-auto grid max-w-[1160px] grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-6 px-6 pt-12 pb-24">
        <AsyncGate loading={loading} error={error}>
          {achievements?.length === 0 && <p className="py-12 text-center text-sm text-muted">No achievements yet.</p>}
          {achievements?.map((achievement, index) => (
            <AchievementCard key={achievement.id} achievement={toDisplayAchievement(achievement, index)} />
          ))}
        </AsyncGate>
      </section>
    </>
  );
}
