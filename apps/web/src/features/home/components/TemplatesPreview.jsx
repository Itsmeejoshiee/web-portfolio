import { Link } from 'react-router-dom';
import { useSiteSection } from '../../../shared/hooks/useSiteSection';
import { TemplateCard } from '../../templates/components/TemplateCard';
import { templates } from '../../templates/data/templates';

const featuredTemplates = templates.filter((template) => template.featured);
const FALLBACK_BODY = 'Intro line placeholder — systems from real freelance work.';

export function TemplatesPreview() {
  const section = useSiteSection('templates-preview');

  return (
    <section id="templates" className="mx-auto max-w-[1160px] border-t border-border px-6 py-24">
      <p className="mb-4 font-mono text-[11px] tracking-[0.14em] text-faint uppercase">03 · notion templates</p>
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-4">
        <h2 className="font-display text-[clamp(34px,4vw,44px)] font-semibold tracking-[-0.01em]">
          Notion templates<span className="text-accent">.</span>
        </h2>
        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
          <span className="font-mono text-[11px] whitespace-nowrap tracking-[0.1em] text-faint">
            this site runs on notion, too …
          </span>
          <Link
            to="/templates"
            className="text-sm font-medium whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            see more →
          </Link>
        </div>
      </div>
      <p className="mb-10 max-w-[520px] text-[15px] text-muted">{section?.body ?? FALLBACK_BODY}</p>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-6">
        {featuredTemplates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </section>
  );
}
