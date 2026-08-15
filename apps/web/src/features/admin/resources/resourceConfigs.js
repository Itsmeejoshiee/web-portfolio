export const RESOURCE_CONFIGS = [
  {
    key: 'projects',
    label: 'Projects',
    titleField: 'title',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'excerpt', label: 'Excerpt', type: 'textarea', required: true },
      { name: 'tags', label: 'Tags (comma-separated)', type: 'tags' },
      { name: 'featured', label: 'Featured', type: 'checkbox' },
      { name: 'imageUrl', label: 'Image URL', type: 'text' },
    ],
  },
  {
    key: 'blog-posts',
    label: 'Blog Posts',
    titleField: 'title',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'date', label: 'Date', type: 'date', required: true },
      { name: 'readTimeMinutes', label: 'Read time (minutes)', type: 'number', required: true },
      { name: 'tag', label: 'Tag', type: 'text', required: true },
      { name: 'featured', label: 'Featured', type: 'checkbox' },
      { name: 'imageUrl', label: 'Image URL', type: 'text' },
    ],
  },
  {
    key: 'templates',
    label: 'Templates',
    titleField: 'title',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'price', label: 'Price ("free" or e.g. "₱ 499")', type: 'text', required: true },
      { name: 'url', label: 'URL', type: 'text', required: true },
      { name: 'featured', label: 'Featured', type: 'checkbox' },
      { name: 'imageUrl', label: 'Image URL', type: 'text' },
    ],
  },
  {
    key: 'experience',
    label: 'Experience',
    titleField: 'title',
    fields: [
      { name: 'track', label: 'Track', type: 'select', options: ['professional', 'community'], required: true },
      { name: 'title', label: 'Role title', type: 'text', required: true },
      { name: 'organization', label: 'Organization', type: 'text', required: true },
      { name: 'startDate', label: 'Start date (e.g. "Jan 2023")', type: 'text', required: true },
      { name: 'endDate', label: 'End date (blank = present)', type: 'text' },
      { name: 'location', label: 'Location (professional only)', type: 'text' },
      {
        name: 'category',
        label: 'Category (community only)',
        type: 'select',
        options: ['community', 'mentorship'],
      },
      { name: 'summary', label: 'Summary', type: 'textarea', required: true },
    ],
  },
  {
    key: 'achievements',
    label: 'Achievements',
    titleField: 'title',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'event', label: 'Event', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'category', label: 'Category (e.g. "hackathon")', type: 'text', required: true },
    ],
  },
  {
    key: 'toolbox-groups',
    label: 'Toolbox Groups',
    titleField: 'category',
    fields: [
      { name: 'category', label: 'Category (e.g. "Languages")', type: 'text', required: true },
      { name: 'items', label: 'Items (comma-separated)', type: 'tags' },
    ],
  },
  {
    key: 'site-sections',
    label: 'Site Sections',
    titleField: 'section',
    fields: [
      { name: 'section', label: 'Section key (e.g. "hero")', type: 'text', required: true },
      { name: 'body', label: 'Body', type: 'textarea' },
      { name: 'ctaLabel', label: 'CTA label', type: 'text' },
      { name: 'ctaUrl', label: 'CTA URL', type: 'text' },
    ],
  },
];

export function getResourceConfig(key) {
  const config = RESOURCE_CONFIGS.find((r) => r.key === key);
  if (!config) {
    throw new Error(`Unknown admin resource: ${key}`);
  }
  return config;
}
