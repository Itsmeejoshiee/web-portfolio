import { Tag } from '../../../shared/components/Tag';

export function TemplateCard({ template }) {
  return (
    <div className="raised-card flex flex-col gap-3.5 p-[26px]">
      <div className="flex items-center justify-between gap-3">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-ink shadow-[3px_3px_0_var(--color-ink)]"
          style={{ background: template.iconBg }}
        >
          <div style={template.iconShapeStyle} />
        </div>
        <Tag size="badge" bg={template.badge.bg} fg={template.badge.fg}>
          {template.badge.label}
        </Tag>
      </div>
      <div>
        <h3 className="font-display mb-1.5 text-[19px] font-semibold">{template.title}</h3>
        <p className="text-sm text-muted">{template.description}</p>
      </div>
      <a
        href="#"
        className="mt-auto text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {template.cta}
      </a>
    </div>
  );
}
