import { PageHeader } from '../../shared/components/PageHeader';
import { ProjectCard } from './components/ProjectCard';
import { projects } from './data/projects';

export function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="work index"
        title="All work"
        badge="synced from notion …"
        intro="[Intro line placeholder — every project, client and personal, newest first.]"
      />
      <section className="mx-auto grid max-w-[1160px] grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-6 px-6 pt-12 pb-24">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>
    </>
  );
}
