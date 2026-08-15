import { PageHeader } from '../../shared/components/PageHeader';
import { TemplateCard } from './components/TemplateCard';
import { templates } from './data/templates';

export function TemplatesPage() {
  return (
    <>
      <PageHeader
        eyebrow="template shop"
        title="Notion templates"
        badge="this site runs on notion, too …"
        intro="[Intro line placeholder — systems built from real freelance work, free and paid.]"
      />
      <section className="mx-auto grid max-w-[1160px] grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-6 px-6 pt-12 pb-24">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </section>
    </>
  );
}
