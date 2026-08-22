import { Tag } from '../../../shared/components/Tag';

export function TemplateCard({ template }) {
  return (
    <div className="raised-card flex flex-col gap-3.5 p-[26px]">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-[19px] font-semibold">{template.title}</h3>
        <Tag size="badge" bg={template.badge.bg} fg={template.badge.fg}>
          {template.badge.label}
        </Tag>
      </div>
      <p className="text-sm text-muted">{template.description}</p>
      <a
        href={template.url}
        className="mt-auto text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        get it
      </a>
    </div>
  );
}
