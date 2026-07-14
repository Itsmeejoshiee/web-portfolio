import { Tag } from '../../../shared/components/Tag';

export function ProjectCard({ project, href = '#' }) {
  return (
    <a
      href={href}
      className="raised-card block overflow-hidden text-ink hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <div className="relative h-[150px] overflow-hidden" style={{ background: project.bannerBg }}>
        <div className="absolute box-border border-[3px] border-ink shadow-[6px_6px_0_var(--color-ink)]" style={project.shapeStyle} />
      </div>
      <div className="px-6 pt-[22px] pb-[26px]">
        <h3 className="font-display mb-2 text-[21px] font-semibold">{project.title}</h3>
        <p className="mb-4 text-sm text-muted">{project.excerpt}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Tag key={tag.label} bg={tag.bg} fg={tag.fg}>
              {tag.label}
            </Tag>
          ))}
        </div>
      </div>
    </a>
  );
}
