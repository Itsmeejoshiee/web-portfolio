import { AsyncGate } from '../../shared/components/AsyncGate';
import { PageHeader } from '../../shared/components/PageHeader';
import { useSiteSection } from '../../shared/hooks/useSiteSection';
import { TemplateCard } from './components/TemplateCard';
import { useTemplates } from './hooks/useTemplates';
import { toDisplayTemplate } from './utils/formatTemplate';

const FALLBACK_INTRO = 'Templates and starter kits built from real freelance work, free and paid.';

export function TemplatesPage() {
  const section = useSiteSection('templates-header');
  const { templates, loading, error } = useTemplates();

  return (
    <>
      <PageHeader
        eyebrow="template shop"
        title="Notion templates"
        badge="this site runs on notion, too …"
        intro={section?.body ?? FALLBACK_INTRO}
      />
      <section className="mx-auto grid max-w-[1160px] grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-6 px-6 pt-12 pb-24">
        <AsyncGate loading={loading} error={error}>
          {templates?.length === 0 && <p className="py-12 text-center text-sm text-muted">No templates yet.</p>}
          {templates?.map((template) => <TemplateCard key={template.id} template={toDisplayTemplate(template)} />)}
        </AsyncGate>
      </section>
    </>
  );
}
