import { Link } from 'react-router-dom';
import { TemplateCard } from '../../templates/components/TemplateCard';
import { templates } from '../../templates/data/templates';

const featuredTemplates = templates.filter((template) => template.featured);

export function TemplatesPreview() {
  return (
    <section id="templates" className="mx-auto max-w-[1160px] border-t border-border px-6 py-24">
      <p className="mb-4 font-mono text-[11px] tracking-[0.14em] text-faint uppercase">03 · notion templates</p>
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-4">
        <h2 className="font-display text-[clamp(34px,4vw,44px)] font-semibold tracking-[-0.01em]">
          Notion templates<span className="text-accent">.</span>
        </h2>
        <div className="flex items-baseline gap-5">
          <span className="font-mono text-[11px] tracking-[0.1em] text-faint">this site runs on notion, too …</span>
          <Link
            to="/templates"
            className="text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            see more →
          </Link>
        </div>
      </div>
      <p className="mb-10 max-w-[520px] text-[15px] text-muted">
        [Intro line placeholder — systems from real freelance work.]
      </p>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
        {featuredTemplates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </section>
  );
}
