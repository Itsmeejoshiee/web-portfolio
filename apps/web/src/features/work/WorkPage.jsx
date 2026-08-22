import { AsyncGate } from '../../shared/components/AsyncGate';
import { PageHeader } from '../../shared/components/PageHeader';
import { useSiteSection } from '../../shared/hooks/useSiteSection';
import { ProjectCard } from './components/ProjectCard';
import { useProjects } from './hooks/useProjects';
import { toDisplayProject } from './utils/formatProject';

const FALLBACK_INTRO = "Every project I've shipped — client work and personal builds, newest first.";

export function WorkPage() {
  const section = useSiteSection('work-header');
  const { projects, loading, error } = useProjects();

  return (
    <>
      <PageHeader
        eyebrow="work index"
        title="All work"
        badge="synced from notion …"
        intro={section?.body ?? FALLBACK_INTRO}
      />
      <section className="mx-auto grid max-w-[1160px] grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-6 px-6 pt-12 pb-24">
        <AsyncGate loading={loading} error={error}>
          {projects?.length === 0 && <p className="py-12 text-center text-sm text-muted">No projects yet.</p>}
          {projects?.map((project, index) => (
            <ProjectCard key={project.id} project={toDisplayProject(project, index)} />
          ))}
        </AsyncGate>
      </section>
    </>
  );
}
