const BADGE_COLOR_PALETTE = [
  { bg: 'var(--color-peach)', fg: 'var(--color-peach-ink)' },
  { bg: 'var(--color-lavender)', fg: 'var(--color-lavender-ink)' },
  { bg: 'var(--color-mint)', fg: 'var(--color-mint-ink)' },
];

// The API only stores a plain category string; badge color is derived from list
// position so the same visual variety as the old hardcoded data survives without a
// color column.
export function toDisplayAchievement(achievement, index) {
  return {
    id: achievement.id,
    title: achievement.title,
    event: achievement.event,
    description: achievement.description,
    featured: achievement.featured,
    badge: { label: achievement.category, ...BADGE_COLOR_PALETTE[index % BADGE_COLOR_PALETTE.length] },
  };
}
