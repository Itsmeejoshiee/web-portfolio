const BANNER_COLOR_PALETTE = [
  'var(--color-peach)',
  'var(--color-lavender)',
  'var(--color-mint)',
  'var(--color-pink)',
];

const TAG_COLOR_PALETTE = [
  { bg: 'var(--color-peach)', fg: 'var(--color-peach-ink)' },
  { bg: 'var(--color-lavender)', fg: 'var(--color-lavender-ink)' },
  { bg: 'var(--color-mint)', fg: 'var(--color-mint-ink)' },
  { bg: 'var(--color-pink)', fg: 'var(--color-pink-ink)' },
];

// The API only stores plain tag strings and no banner color; both are derived from
// list position so the same visual variety as the old hardcoded data survives
// without dedicated color columns.
export function toDisplayProject(project, index) {
  return {
    id: project.id,
    title: project.title,
    excerpt: project.excerpt,
    featured: project.featured,
    imageUrl: project.imageUrl,
    bannerColor: BANNER_COLOR_PALETTE[index % BANNER_COLOR_PALETTE.length],
    tags: project.tags.map((label, tagIndex) => ({
      label,
      ...TAG_COLOR_PALETTE[tagIndex % TAG_COLOR_PALETTE.length],
    })),
  };
}
