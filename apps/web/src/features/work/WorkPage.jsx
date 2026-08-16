import { PageHeader } from '../../shared/components/PageHeader';
import { useSiteSection } from '../../shared/hooks/useSiteSection';
import { ProjectCard } from './components/ProjectCard';
import { projects } from './data/projects';

const FALLBACK_INTRO = 'Intro line placeholder — every project, client and personal, newest first.';

export function WorkPage() {
  const section = useSiteSection('work-header');

  return (
    <>
      <PageHeader
        eyebrow="work index"
        title="All work"
        badge="synced from notion …"
        intro={section?.body ?? FALLBACK_INTRO}
      />
      <section className="mx-auto grid max-w-[1160px] grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-6 px-6 pt-12 pb-24">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>
    </>
  );
}
