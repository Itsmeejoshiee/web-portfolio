const TAG_COLOR_PALETTE = [
  { bg: 'var(--color-lavender)', fg: 'var(--color-lavender-ink)' },
  { bg: 'var(--color-mint)', fg: 'var(--color-mint-ink)' },
  { bg: 'var(--color-peach)', fg: 'var(--color-peach-ink)' },
  { bg: 'var(--color-pink)', fg: 'var(--color-pink-ink)' },
];

export function formatPostDate(isoDate) {
  const date = new Date(`${isoDate}T00:00:00`);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase();
}

// The API only stores a plain tag string; colors are assigned by list position
// so the same visual variety as the old hardcoded data survives without a color column.
export function toDisplayPost(post, index) {
  const color = TAG_COLOR_PALETTE[index % TAG_COLOR_PALETTE.length];
  return {
    id: post.id,
    date: formatPostDate(post.date),
    title: post.title,
    readTime: `${post.readTimeMinutes} min read`,
    tag: { label: post.tag, ...color },
    content: post.content,
  };
}
