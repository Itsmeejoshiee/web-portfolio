import { Link } from 'react-router-dom';
import { ProjectCard } from '../../work/components/ProjectCard';
import { projects } from '../../work/data/projects';

const featuredProjects = projects.filter((project) => project.featured);

export function SelectedWorkPreview() {
  return (
    <section id="work" className="mx-auto max-w-[1160px] border-t border-border px-6 py-24">
      <p className="mb-4 font-mono text-[11px] tracking-[0.14em] text-faint uppercase">01 · selected work</p>
      <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4">
        <h2 className="font-display text-[clamp(34px,4vw,44px)] font-semibold tracking-[-0.01em]">
          Selected work<span className="text-accent">.</span>
        </h2>
        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
          <span className="font-mono text-[11px] whitespace-nowrap tracking-[0.1em] text-faint">
            synced from notion …
          </span>
          <Link
            to="/work"
            className="text-sm font-medium whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            see more →
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-6">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} href="#work" />
        ))}
      </div>
    </section>
  );
}
