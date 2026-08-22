const FREE_BADGE = { bg: 'var(--color-mint)', fg: 'var(--color-mint-ink)' };
const PAID_BADGE = { bg: 'var(--color-gold)', fg: 'var(--color-gold-ink)' };

// The API only stores a plain price string; badge color is derived from whether it
// reads "free" so the same visual distinction as the old hardcoded data survives
// without a color column.
export function toDisplayTemplate(template) {
  const isFree = template.price.trim().toLowerCase() === 'free';
  return {
    id: template.id,
    title: template.title,
    description: template.description,
    url: template.url,
    featured: template.featured,
    badge: { label: template.price, ...(isFree ? FREE_BADGE : PAID_BADGE) },
  };
}
